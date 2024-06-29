import sys
sys.path.append('../private') #private files
from hidden import uri #private files
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

mango = MongoClient(uri, server_api=ServerApi('1'))
database = mango['langDB']
collection = database['articles']

toInsert = {
    'username' : 'admin',
    'name' : 'patron',
    'password' : 'yurrrAZ',
    'highlighting' : []
}

mango['langDB']['users'].drop()
if len(list(mango['langDB']['users'].find({"username": toInsert['username']}))) != 0:
    print('user exists')
else:
    print("user doesn't exist yet")
    mango['langDB']['users'].insert_one(toInsert)
