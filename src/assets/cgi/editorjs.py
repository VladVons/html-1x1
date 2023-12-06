#!/usr/bin/python3


import os
import sys
import json


def LoadJson(aFile: str):
    Res = {}
    if (os.path.exists(aFile)):
        with open(aFile, 'r', encoding = 'utf-8') as F:
            Res = json.load(F)
    return Res

def SaveJson(aFile: str, aData: dict):
    with open(aFile, 'w') as F:
        json.dump(aData, F)

def Answer(aData: dict = {}):
    print('Content-type: application/json\n')
    print(json.dumps(aData))

def Main():
    Data = sys.stdin.buffer.read()
    if (Data):
        Data = json.loads(Data.decode('utf-8'))
    else:
        Data = {'err': 'no data'}

    aMode = Data.get('mode')
    if (aMode == 'save'):
        try:
            SaveJson('editor.json', Data.get('data'))
            Res = {'status': 'ok'}
        except Exception as E:
            Res = {'status': 'err', 'info': str(E)}
    elif (aMode == 'load'):
        Res = LoadJson('editor.json')

    Answer(Res)

Main()
