#!/usr/bin/python3

'''
Created: 2023.12.06
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
'''


import os
import sys
import json


def ParseQuery(aVal: str) -> dict:
    Res = {}
    if (aVal):
        for Pair in aVal.split('&'):
            Key, Val = Pair.split('=')
            Res[Key] = Val
    return Res

def PostToJson() -> dict:
    Data = sys.stdin.buffer.read()
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
    #return Answer(Res, Code)

    Query = os.environ.get('QUERY_STRING')
    Query = ParseQuery(Query)
    aMode = Query.get('mode')
    if (aMode == 'save_editor'):
        try:
            Data = PostToJson()
            SaveFileJson('editor.json', Data.get('data'))
        except Exception as E:
            Code = 500
            Res = {'status': 'err', 'info': str(E)}
    elif (aMode == 'load_editor'):
        Res = LoadFileJson('editor.json')
    else:
        Code = 404
        Res = {'status': 'err', 'info': f'unknown mode `{aMode}`'}

    Answer(Res, Code)

Main()
