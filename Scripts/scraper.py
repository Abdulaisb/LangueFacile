from bs4 import BeautifulSoup
import requests

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
        if linkList[-1].isdigit() and not "video" in linkList[0]: 
            links.append(link)

for obj in links:
    print(url+obj)
print(len(links))

#Next Steps
# - open link, find main text, split by sentence
# - get article info (url, author, title, sentence list, language)
# - 
# - 