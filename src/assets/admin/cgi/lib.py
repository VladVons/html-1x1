'''
Created: 2023.12.06
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
'''


import os
import sys
import cgi
import json


cFileLog = 'editorjs.log'


def ParseQuery(aVal: str) -> dict:
    Res = {}
    if (aVal):
        for Pair in aVal.split('&'):
            Key, Val = Pair.split('=')
            Res[Key] = Val
    return Res

def GetPostAsData() -> dict:
    return sys.stdin.buffer.read()

def GetPostAsStr() -> dict:
    return GetPostAsData().decode('utf-8')

def GetPostAsJson() -> dict:
    Data = GetPostAsData()
    if (Data):
        Res = json.loads(Data.decode('utf-8'))
    else:
        Res = {'err': 'no post data'}
    return Res

def LoadFileJson(aFile: str):
    Res = {}
    if (os.path.exists(aFile)):
        with open(aFile, 'r', encoding = 'utf-8') as F:
            Res = json.load(F)
    return Res

def SaveFileJson(aFile: str, aData: dict):
    with open(aFile, 'w') as F:
        json.dump(aData, F)

def SaveFileStorage(aFileItem, aDir: str) -> str:
    Res = aFileItem.filename
    os.makedirs(aDir, exist_ok=True)
    File = f'{aDir}/{Res}'
    with open(File, 'wb') as F:
        F.write(aFileItem.file.read())
    return Res

def Log(aData: str, aFile: str = 'editorjs.log'):
    with open(aFile, 'a+') as F:
        F.write(f'{aData}\n')

def HttpAnswer(aData: dict, aCode: int = 200):
    print('Content-type: application/json')
    print('Access-Control-Allow-Origin: *')
    if (aCode != 200):
        print(f'Status: {aCode} Server error')
    print('\n')
    print(json.dumps(aData))

def Run(aFunc, aDebug: bool = False):
    if (aDebug):
        # redirect print() to file
        with open(cFileLog, 'a+') as sys.stdout:
            aFunc()
    else:
        aFunc()
