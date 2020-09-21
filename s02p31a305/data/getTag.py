import math
import pandas as pd 
import numpy as np
from krwordrank.word import summarize_with_keywords

text = pd.read_csv('review.txt', header=None, delimiter='|')
idx_foreign = text[text[1] != 'ko'].index
ko_text = text.drop(idx_foreign)
reviews = list(np.array(ko_text[3].tolist()))

# wordrank_extractor = KRWordRank(min_count=5, max_length=10)
# keywords, rank, graph = wordrank_extractor.extract(reviews, num_keywords=10)

keywords = summarize_with_keywords(reviews, min_count=5, max_length=10, num_keywords=2366, beta=0.85, max_iter=10, verbose=True)
with open('tagsforall.txt', 'a', encoding='utf-8') as file:
  for k in keywords:
    temptext = str(k) + '|' + str(keywords[k]) + '\n'
    file.write(temptext)
