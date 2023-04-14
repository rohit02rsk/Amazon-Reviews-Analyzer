# from flask import Flask, jsonify, request
# from flask_cors import CORS  # Import the CORS package

# app = Flask(__name__)
# CORS(app)  # Add CORS to your app

# @app.route('/api/data', methods=['POST'])
# def get_data():
#     # Assuming the frontend sends data in JSON format
#     data = request.json
#     # Process the data here...
#     result = {"message": "data"}
#     return jsonify(result)

# if __name__ == '__main__':
#     app.run(debug=True)



# %%





import sys
import numpy as np
import pandas as pd
from textblob import TextBlob
import nltk
from nltk.corpus import stopwords
#import wordcloud
import seaborn as sns
import re, string
import time
import nltk
import nltk.data
from nltk.collocations import *
from matplotlib import pyplot as plt
# nltk.download('punkt')
from nltk import word_tokenize, pos_tag, pos_tag_sents, sent_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
# nltk.download('averaged_perceptron_tagger')
# nltk.download('stopwords')
# nltk.download('wordnet')
from sentistrength import PySentiStr
import collections
from textblob import TextBlob
from matplotlib.ticker import StrMethodFormatter
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from nltk.corpus import wordnet

# %%
import urllib.request as request
import json

# %%

# %%
def build(response):
    print("START")
    temp=response
    n=len(temp['items'])
    temp=temp['items']
    texts= [d.get('text', None) for d in temp]
    asins= [d.get('asin',None)for d in temp]
    locations= [d.get('location_and_date',None)for d in temp]
    titles=[d.get('title',None)for d in temp]
    ratings= [d.get('rating',None)for d in temp]
    verifies= [d.get('verified',None)for d in temp]


    # %%
    len(asins)

    # %%
    # df= pd.read_json('macbook.json')
    df=pd.DataFrame({
        'asin':asins,
        'text':texts,
        'title':titles,
        'location_and_date':locations,
        'verified':verifies,
        'rating': ratings
    })

    # %%
    # df=pd.read_csv('testy.csv')
    # df.head()

    # %%
    df_reviews= df[['rating','text']].copy()

    # %%
    df_reviews.rename(columns = {'text':'ReviewText'}, inplace = True)
    df_reviews.rename(columns = {'rating':'Rating'}, inplace = True)

    # %%
    df_reviews['ReviewText'] = df_reviews['ReviewText'].astype(str)
    df_reviews['ReviewLength'] = df_reviews['ReviewText'].apply(len)
    # sns.set_style('white')
    # g=sns.FacetGrid(df_reviews,col='Rating')
    # g.map(plt.hist,'ReviewLength')

    # %% [markdown]
    # CLEANING TEXT

    # %%
    def clean_text(text):
        text=re.sub(r"\?", ".", text)
        text=re.sub(r"\!", ".", text)
        text=re.sub(r'([.])\1+', r'\1', text)
        rexp=r"\.(?=[A-Za-z]{1,15})"
        text=re.sub(rexp, ". ", text)
        return text

    # %%
    df_reviews['CleanedReviewText'] = df_reviews['ReviewText'].apply(clean_text)
    df_reviews['CleanedReviewText'] = df_reviews['CleanedReviewText'].apply(sent_tokenize)

    # %%
    df_reviews = df_reviews.explode('CleanedReviewText', ignore_index=False)

    # %%
    def lemma_words_pos_filtered(text):
        word_list=[]
        lemmatizer = WordNetLemmatizer()
        tokens = nltk.word_tokenize(text)
        pos_tokens=nltk.pos_tag(tokens)
        for pos in pos_tokens:
            if (pos[1].startswith('N')):
                word_list=word_list+[lemmatizer.lemmatize(pos[0].lower(), wordnet.NOUN)]
            if (pos[1].startswith('V')):
                word_list=word_list+[lemmatizer.lemmatize(pos[0].lower(), wordnet.VERB)]
            if (pos[1].startswith('J')):             
                word_list=word_list+[lemmatizer.lemmatize(pos[0].lower(), wordnet.ADJ)] 
            
            word_list=[word for word in word_list if word not in stopwords.words('english') ] 
            
        return  " ".join(word_list)

    df_reviews['lemma_words_pos_filtered']=df_reviews['CleanedReviewText'].apply(lemma_words_pos_filtered)

    # %%
    bigram_measures = nltk.collocations.BigramAssocMeasures()
    finder = BigramCollocationFinder.from_words( " ".join(df_reviews['lemma_words_pos_filtered']).split(),window_size=5)#keeping bigrams that occur at least 5 times
    finder.apply_freq_filter(5)
    bigram_list_tuples=finder.nbest(bigram_measures.likelihood_ratio, 30)

    # %%
    def unique_tuples(list_of_tuples):
        list_ = [tuple(sorted(t)) for t in list_of_tuples]
        list_ = list(set(list_))
        return list_

    bigram_features=unique_tuples(bigram_list_tuples)
    length_features2=len(bigram_features)

    # %%
    def findbigramsintext(text):
        mylist=nltk.word_tokenize(text)
        list1=[x for x in mylist]
        feature_list = []
        for i in range(length_features2):
                feature_list.append([])       
                i=0    
        for l in bigram_features:
                list2=[x for x in l]
                result =  all(elem in list1  for elem in list2)
                if result: 
                    feature_list[i].append(' '.join(list2))
                i=i+1
        return feature_list
        
    df_reviews['bigram_list'] = df_reviews['lemma_words_pos_filtered'].apply(findbigramsintext)

    # %%
    def keepnonempty(list1):
        mylist= [x for x in list1 if x != []]
        return mylist
    def flatten_list(row_list):
            l = [item for inner_list in row_list for item in inner_list]
            return l
            
    df_reviews['bigrams']=df_reviews['bigram_list'].apply(keepnonempty)

    df_reviews['bigrams']=df_reviews['bigrams'].apply(flatten_list)

    # %%
    df_reviews['polarity'] = df_reviews['CleanedReviewText'].apply(lambda x: TextBlob(x).sentiment[0])

    # %%
    df_reviews = df_reviews.explode('bigrams', ignore_index=False)

    # %%
    df_reviews[['bigrams','polarity']].groupby('bigrams')['polarity'].mean().sort_values().head(20)

    # %%
    filtered_df = df_reviews[df_reviews['bigrams'].notnull()]
    filtered_df.info()

    # %%
    final_df= filtered_df[['bigrams','polarity']]
    dict1=final_df.to_dict()


    # %%
    final_df.to_json('file.json', orient = 'split', compression = 'infer', index = 'true')

    # %%
    import joblib

    # %%
    pip= joblib.load('C:/Users/HP/TARP/AMAZON-REVIEW-ANALYZER-master/AMAZON SCRAPER/test/pipeline.joblib')
    
    # %%
    res= pip.predict(texts)
    for i in range (len(res)):
        if(res[i]=='OR'):
            res[i]=1
        else:
            res[i]=0

    # %%
    df_temp= pd.DataFrame({
        'Review_Text':texts,
        'Rating':ratings,
        'Title': titles,
        'Verified': verifies,
        'Location_and_Date':locations,
        'Fake_or_True': res
    })

    def Merge(dict1, dict2):
        res = {**dict1, **dict2}
        return res

    dict2= df_temp.to_dict()
    dict3= Merge(dict1,dict2)
    print("FINAL")
    # %%
    return dict3
    # %%
    # df.to_json('Fake_Real_Rev.json', orient = 'split', compression = 'infer', index = 'true')


# %%

import asyncio
import requests
import functools

# async def fetch(id):
#     url = "http://localhost:9080/crawl.json?start_requests=true&spider_name=amazon_reviews&crawl_args={%22cat%22:%22"+id+"%22}"
#     headers = {"Content-Type" : "application/x-www-form-urlencoded"}
#     get_with_headers = functools.partial(requests.get, headers=headers)
#     response = await asyncio.get_event_loop().run_in_executor(None, get_with_headers, url)

#     return json.loads(response.text)

from flask import jsonify

# @app.route('/fetch/<id>')
async def fetch(id):
    url = "http://localhost:9080/crawl.json?start_requests=true&spider_name=amazon_reviews&crawl_args={%22cat%22:%22"+id+"%22}"
    headers = {"Content-Type" : "application/x-www-form-urlencoded"}
    get_with_headers = functools.partial(requests.get, headers=headers)
    response = await asyncio.get_event_loop().run_in_executor(None, get_with_headers, url)
    print("in function")
    response_data = json.loads(response.text)
    return response_data



from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/api/data",methods=['GET','POST'])

async def run():
    if request.method=='POST':
        print('1')
        data = request.json
        id = data['url'].split('/')[5]
        print(id)
        response = await fetch(id)
        print("GOT RESPONSE")
        print(type(response))
        print (response)
        temp= build(response)
        print("THIS IS TEMP")
        print(temp)
        return jsonify(temp)
    
if __name__ == "__main__":
    app.run(debug=True)


# %%
