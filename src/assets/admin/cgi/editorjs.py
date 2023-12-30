#!/usr/bin/python3

'''
Created: 2023.12.06
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
'''


import os
import cgi
#
from lib import Run, ParseQuery, GetPostAsData, GetPostAsJson, LoadFileJson, SaveFileJson, HttpAnswer, SaveFileStorage


cFileDat = 'editorjs.dat.json'

def Main():
    Code = 200
    Res = {'status': 'ok'}

    Query = os.environ.get('QUERY_STRING')
    Query = ParseQuery(Query)
    aMode = Query.get('mode')
    if (aMode == 'save_editor'):
        try:
            Data = GetPostAsJson()
            SaveFileJson(cFileDat, Data.get('data'))
        except Exception as E:
            Code = 500
            Res = {'status': 'err', 'info': str(E)}
    elif (aMode == 'load_editor'):
        GetPostAsData()
        Res = LoadFileJson(cFileDat)
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

    HttpAnswer(Res, Code)

Run(Main)
