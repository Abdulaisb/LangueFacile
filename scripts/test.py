import sys
sys.path.append('../private')
from hidden import uri

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


# Create a new client and connect to the server
mango = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    mango.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

url = "https://information.tv5monde.com/terriennes/tribune-metoo-malgre-le-courage-des-victimes-cest-limpunite-qui-grandit-2721893"

for x in mango['langDB']['Articles'].find({"link": url}):
    print(x['link'])
