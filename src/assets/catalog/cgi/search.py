#!/usr/bin/python3

import cgi
import json

with open('search.json', 'r', encoding = 'utf-8') as F:
    Data = json.load(F)

Form = cgi.FieldStorage()
qVal = Form.getvalue('q', '').lower()
if (qVal):
    Res = [x for x in Data if (qVal in x)]
else:
    Res = []

print('Content-type: application/json')
print()
print(json.dumps(Res))
