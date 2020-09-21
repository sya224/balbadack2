import math, re
import pandas as pd 
import numpy as np
from konlpy.tag import Komoran
from krwordrank.word import summarize_with_keywords, KRWordRank

komoran = Komoran()
skipwords = [
  '동물병원', '병원', '의사', '구름', '반려', '곳', '애견', '견', '원장', '이렇다', '그렇다', '언니'
  '선생님', '간호사', '직원', '스태프', '개', '강아지','고양이', '여러분', '스탭', '우리집'
  '것', '거', '대체', '외', '너무', '때', '같은', '그런지', '안', '게', '모두', '년', '하루', '여자', '애기', '아가', '!!'
  '넘', '진짜', '도담이', '사랑', '예쁘다', '이것저것', '아이', '우리', '진료', '치료', '군데', '수의사', '이참', '강지'
]
umi = {
  'VA':'다', 'XR':'한', 'VV':'는', 'NNG':'', 'NN':'', 'NNP':'', 'NNB':''
}

def checkskipwords(w):
  if len(w) == 1: return True
  for s in skipwords:
    if w in s:return True
  return False


def umi_churi(words):
  churied = []
  for word in words:
    i = word.index('/')
    if checkskipwords(word[:i]):continue
    ugan.append(word[:i])
    churied.append(word[:i]+umi[word[i+1:]])
  return churied

def ugan_churi(words):
  ugan = {}
  for word in words:
    i = word.index('/')
    if checkskipwords(word[:i]):continue
    if ugan.get(word[:i]):
      ugan[word[:i]][0] += 1
    else:
      ugan[word[:i]] = [0, word[:i]+umi[word[i+1:]]]
  return ugan

def komoran_tokenize(sent):
  words = komoran.pos(sent, join=True)
  # words = [w for w in words if ('/NN' in w or '/XR' in w or '/VA' in w or '/VV' in w)]
  words = [w for w in words if ('/NN' in w or '/VA' in w)]
  ugan = ugan_churi(words)
  words = [v for v in ugan.values()]    
  words.sort(key=lambda x: -x[0])
  keywords = [v for c,v in words]
  return keywords

text = pd.read_csv('review.txt', header=None, delimiter='|')
idx_foreign = text[text[1] != 'ko'].index
ko_text = text.drop(idx_foreign)

t = 0
curr_hos = ko_text.iloc[0, 0]
hos_a_reviews = []
hos_n_reviews = []

while t < len(ko_text):
  if ko_text.iloc[t, 0] == curr_hos:
    if ko_text.iloc[t, 2] > 3:
      hos_a_reviews.append(ko_text.iloc[t, 3])
    else:
      hos_n_reviews.append(ko_text.iloc[t, 3])
  else:
    curr_hos = ko_text.iloc[t, 0]
    a_words = komoran_tokenize('\n'.join(hos_a_reviews))
    n_words = komoran_tokenize('\n'.join(hos_n_reviews))
    with open('tagsforhos.txt', 'a', encoding='utf-8') as file:
      if a_words:
        a_info = curr_hos+'|'+'a'+'|'+','.join(a_words)+'\n'
        file.write(a_info)
      if n_words:
        n_info = curr_hos+'|'+'n'+'|'+','.join(n_words)+'\n'
        file.write(n_info)
    hos_a_reviews = []
    hos_n_reviews = []
  t += 1


