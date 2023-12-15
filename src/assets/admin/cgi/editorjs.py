#!/usr/bin/python3

'''
Created: 2023.12.06
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
'''


import os
import sys
import cgi
import json

cFile = 'editorjs.dat.json'

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

def Answer(aData: dict, aCode: int = 200):
    print('Content-type: application/json')
    print('Access-Control-Allow-Origin: *')
    if (aCode != 200):
        print(f'Status: {aCode} Server error')
    print('\n')
    print(json.dumps(aData))

def Main():
    Code = 200
    Res = {'status': 'ok'}

    Query = os.environ.get('QUERY_STRING')
    Query = ParseQuery(Query)
    aMode = Query.get('mode')
    if (aMode == 'save_editor'):
        try:
            Data = GetPostAsJson()
            SaveFileJson(cFile, Data.get('data'))
        except Exception as E:
            Code = 500
            Res = {'status': 'err', 'info': str(E)}
    elif (aMode == 'load_editor'):
        GetPostAsData()
        Res = LoadFileJson(cFile)
    elif (aMode == 'save_img'):
        Form = cgi.FieldStorage()
        if ('image' in Form):
            DirRoot = os.environ.get('DOCUMENT_ROOT')
            Dir = os.environ.get('SCRIPT_NAME').rsplit('/', maxsplit=1)[0]
            try:
                File = SaveFileStorage(Form['image'], f'{DirRoot}{Dir}')
                Res = {
                    'success' : 1,
                    'file': {'url' : f'{Dir}/{File}'}
                }
            except Exception as E:
                Res = {'success' : 0, 'error': str(E)}
    else:
        Code = 404
        Res = {'status': 'err', 'info': f'unknown mode `{aMode}`'}

    Answer(Res, Code)

Main()
