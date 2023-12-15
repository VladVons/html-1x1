#!/usr/bin/python3

import json

with open('category.json', 'r', encoding = 'utf-8') as F:
    Res = json.load(F)

print('Content-type: application/json')
print()
print(json.dumps(Res))
