from bs4 import BeautifulSoup
import requests
import os
import sys
from google.cloud import translate_v2 as translate

sys.path.append('../private') #private files
from hidden import lf_service_1, uri #private files

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = lf_service_1
translator = translate.Client()
mango = MongoClient(uri, server_api=ServerApi('1'))

def getLinks():
    #Setup
    url = 'https://information.tv5monde.com'
    session = requests.session()
    response = requests.get(url)
    page = BeautifulSoup(response.content, 'html.parser')

    #Gets cards that link to articles
    newsCards = page.find_all(class_=['views-row', 'slick-slide']) 
    #Extracts links from cards
    links = []
    for card in newsCards:
        linkTags = card.find_all('a')
        for tag in linkTags:
            link = tag['href']
            linkList = link.split('-')
            #Filter links for only articles
            valid = linkList[-1].isdigit() and not ("video" in linkList[0] or "direct" in linkList[0])
            if valid: 
                links.append(url+link)
    freshLinks = []
    #Filters Duplicate Links
    for link in links:
        if len(list(mango['langDB']['articles'].find({"link": link}))) != 0:
            continue
        freshLinks.append(link)            
    return freshLinks

def readArticle(url):
    #Setup
    session = requests.session()
    response = requests.get(url)
    page = BeautifulSoup(response.content, 'html.parser')
    #Article Title
    title = page.find('h1').get_text().replace('\n','')
    #Article Text
    text = ""
    paragraphs = page.find_all('p')
    for tag in paragraphs[0:-2]:
        if (tag.get('class') != None or tag.get('id') != None):
            continue
        tagText = tag.get_text()
        if tagText == " " or len(tagText) == 0:
            continue
        text += tagText
    text1 = []
    text2 = []
    
    for sentence in text.split('.'):
        text1.append(sentence)
        text2.append(translator.translate(sentence, target_language='en')['translatedText'])
    return {
        'title' : title,
        'lang1' : 'french',
        'lang2' : 'english',
        'text1' : text1,
        'text2' : text2,
        'link' : url
    }
def scrape():
    links = getLinks()
    print('Fresh Links Found:' , len(links))
    toInsert = []
    for link in links:
        article = readArticle(link)
        print('Processed:', article['title'])
        toInsert.append(article)
    print('Articles Processed: ', len(toInsert))
    return toInsert
def insertDB(toInsert):    
    database = mango['langDB']
    collection = database['articles']
    if len(toInsert) != 0:
        collection.insert_many(toInsert)
        print('Articles Inserted!!')
    else:
        print('All links are duplicates!!')

insertDB(scrape())