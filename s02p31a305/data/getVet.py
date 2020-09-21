import requests
import json
import time

check = []

APIKEY = "Your Api Key"

def findPlaces(loc=None,radius=1500, pagetoken = None):
  lat, lng = loc
  url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=animal&location={lat},{lng}&radius={radius}&key={APIKEY}{pagetoken}".format(lat = lat, lng = lng, radius = radius, APIKEY = APIKEY, pagetoken = "&pagetoken="+pagetoken if pagetoken else "")
  response = requests.get(url)
  res = json.loads(response.text)
  with open('vet.txt', mode='a', encoding='utf-8') as file:
    for result in res["results"]:
      if result["place_id"] not in check:
        print('추가')
        check.append(result["place_id"])
        temp = [
          result["place_id"],
          result["name"],
          str(result["geometry"]["location"]["lat"]), 
          str(result["geometry"]["location"]["lng"]),
          str(result.get("rating",0)),
          str(result.get("user_ratings_total",0)),
          result["formatted_address"]
        ]
        temptxt = ','.join(temp)+'\n'
        file.write(temptxt)
      else:
        print('겹침')
  pagetoken = res.get("next_page_token",None)
  return pagetoken


# 대략적인 서울 지역
# start는 서울의 남서쪽 좌표, end는 서울의 북서쪽 좌표
start = [37.461, 126.817]
end = [37.666, 127.214]


loc = [start[0], start[1]]
pagetoken = None

# 1500미터 간격으로 서울 지역의 동물 병원을 밑에서부터 오른쪽 방향으로 탐색하는 완전 탐색 알고리즘으로 요청
# 검색 결과가 겹치는 부분이 상당히 많았다, 범위와 간격을 3배 정도 더 넓혀도 될 듯하다 
while True:
  loc[1] += 0.003
  if loc[1] > end[1]:
    loc[1] = start[1]
    loc[0] += 0.003
  if loc[0] > end[0]:
    break 
  while True:
      pagetoken = findPlaces(loc=[str(loc[0]), str(loc[1])], pagetoken=pagetoken)
      if not pagetoken:
          break
      time.sleep(5)

# , 구분자가 주소 필드에서 쓰여 열의 개수가 행마다 다른 것을 발견했고 | 구분자로 수정했다
import csv

with open('vet_raw.txt', 'r', encoding='utf-8') as f1:
  with open('vet.txt', 'a', encoding='utf-8') as f2:
    lines = csv.reader(f1)
    for li in lines:
      temp = [li[0], li[1], li[2], li[3], li[4], ''.join(li[5:])]
      temptxt = '|'.join(temp) + '\n'
      f2.write(temptxt)
