#!/usr/bin/python3

import json

with open('category.json', 'r', encoding = 'utf-8') as F:
    Data = json.load(F)

print('Content-type: application/json\n')
print(json.dumps(Data))
