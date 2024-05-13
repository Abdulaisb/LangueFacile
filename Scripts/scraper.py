from bs4 import BeautifulSoup
import requests
from googletrans import Translator

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
    title = page.find('h1')
    text = ""
    for tag in paragraphs[0:-2]:
        if (tag.get('class') != None or tag.get('id') != None):
            continue
        text += tag.get_text()
    lang1 = []
    lang2 = []
    translator = Translator()
    for sentence in text.split('.'):
        lang1.append(sentence)
        print(sentence)
        print(translator.translate(text=sentence, dest = "en", src="fr"))
        
    
    
    

links = getLinks()
readArticle(links[-1])
print(links[-1])

#Next Steps
# - open link, find main text, split by sentence
# - get article info (url, author, title, sentence list, language)
# - 
# - 