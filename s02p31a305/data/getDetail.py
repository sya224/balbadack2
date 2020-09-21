import requests
import json
import re
import pandas as pd 
import numpy as np

APIKEY = "Your Api Key"

basicURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id="
fields = "&fields = permanently_closed, photo, formatted_phone_number, opening_hours, website, price_level, rating, review"
key = f"&key={APIKEY}"

detail = open('detail.txt', mode='a', encoding='utf-8')
review = open('review.txt', mode='a', encoding='utf-8')
photo = open('photo.txt', mode='a', encoding='utf-8')

def getDetail(place_id):
  url = basicURL+place_id+fields+key
  response = requests.get(url)
  res = json.loads(response.text)
  result = res["result"]
  d_t = [
    result["place_id"], 
    result["name"],
    str(result["geometry"]["location"]["lat"])+','+str(result["geometry"]["location"]["lng"]),
    result.get("formatted_address", ""),
    result.get("formatted_phone_number", ""),
    result["opening_hours"]["weekday_text"][0][8:] if result.get("opening_hours") else "",
    result["opening_hours"]["weekday_text"][1][9:] if result.get("opening_hours") else "",
    result["opening_hours"]["weekday_text"][2][11:] if result.get("opening_hours") else "",
    result["opening_hours"]["weekday_text"][3][10:] if result.get("opening_hours") else "",
    result["opening_hours"]["weekday_text"][4][8:] if result.get("opening_hours") else "",
    result["opening_hours"]["weekday_text"][5][10:] if result.get("opening_hours") else "",
    result["opening_hours"]["weekday_text"][6][8:] if result.get("opening_hours") else "",
    result.get("website", ""),
    str(result.get("rating", ""))
  ]
  d_text = '|'.join(d_t) + '\n'
  detail.write(d_text)

  if result.get('photos'):
    for p in result['photos']:
      p_t = [p["photo_reference"], str(p["height"]), str(p["width"])]
      p_t.insert(0, result["place_id"])
      p_text = '|'.join(p_t) + '\n'
      photo.write(p_text)

  if result.get('reviews'):
    for r in result['reviews']:
      raw_r = r["text"]
      str_r = re.sub('\n', ' ', raw_r)
      r_t = [r.get("language", ""), str(r["rating"]), str_r, str(r["time"])]
      r_t.insert(0, result["place_id"])
      r_text = '|'.join(r_t) + '\n'
      review.write(r_text)

vet = pd.read_csv('vet.txt', header=None, delimiter='|')
vet_code = list(np.array(vet[0].tolist()))

for code in vet_code[50:]:
  getDetail(code)

detail.close()
review.close()
photo.close()