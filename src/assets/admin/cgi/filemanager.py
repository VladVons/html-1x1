#!/usr/bin/python3

'''
Created: 2023.12.06
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
'''


import os
import cgi
#
from lib import Run, ParseQuery, GetPostAsJson, GetDirList, HttpAnswer


cDirImg = '../../common/img'

def Main():
    Code = 200
    Res = {'status': 'ok'}

    Query = os.environ.get('QUERY_STRING')
    Query = ParseQuery(Query)
    aMode = Query.get('mode')
    if (aMode == 'upload'):
        Form = cgi.FieldStorage()
        if ('files' in Form):
            DirRoot = os.environ.get('DOCUMENT_ROOT')
            Dir = os.environ.get('SCRIPT_NAME').rsplit('/', maxsplit=1)[0]
            try:
                for x in Form['files']:
                    SaveFileStorage(x, f'{DirRoot}{Dir}')
            except Exception as E:
                Res = {'success' : 0, 'error': str(E)}
    elif (aMode == 'dir_list'):
        Data = GetPostAsJson()
        try:
            Res['data'] = GetDirList(cDirImg)
        except Exception as E:
            Res = {'success' : 0, 'error': str(E)}
    else:
        Code = 404
        Res = {'status': 'err', 'info': f'unknown mode `{aMode}`'}

    HttpAnswer(Res, Code)


Run(Main)
