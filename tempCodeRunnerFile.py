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
nltk.download('punkt')
from nltk import word_tokenize, pos_tag, pos_tag_sents, sent_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
nltk.download('wordnet')
from sentistrength import PySentiStr
import collections
from textblob import TextBlob
from matplotlib.ticker import StrMethodFormatter
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from nltk.corpus import wordnet