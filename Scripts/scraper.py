from bs4 import BeautifulSoup
import requests
import os
import sys
from google.cloud import translate_v2 as translate

sys.path.append('../private') #private files
from hidden import lf_service_1 #private files
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = lf_service_1
translator = translate.Client()

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
            #Consider filtering out "direct" links
            valid = linkList[-1].isdigit() and not ("video" in linkList[0] or "direct" in linkList[0])
            if valid: 
                links.append(url+link)
    return links

def readArticle(url):
    #Setup
    session = requests.session()
    response = requests.get(url)
    page = BeautifulSoup(response.content, 'html.parser')
    paragraphs = page.find_all('p')
    title = page.find('h1').get_text().replace('\n','')
    text = ""
    for tag in paragraphs[0:-2]:
        if (tag.get('class') != None or tag.get('id') != None):
            continue
        text += tag.get_text()
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

links = getLinks()
print(readArticle(links[0]))

