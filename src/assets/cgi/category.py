#!/usr/bin/python3

import json

File = 'category.json'
with open(File, 'r', encoding = 'utf-8') as F:
    Data = json.load(F)

print('Content-type: application/json\n')
print(json.dumps(Data))
