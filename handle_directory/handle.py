#coding:utf-8

# >>> [x for x in os.listdir('.') if os.path.isfile(x) and os.path.splitext(x)[1]=='.py']
# >>> [x for x in os.listdir('.') if os.path.isdir(x)]

import os
import json

pathList = []

def readDir(childList, pathName, dirName):
    pathDict = {
        'title': dirName,
        'urlList': [],
        'titleList': []
    }
    childList.append(pathDict)
    if os.path.isdir(pathName):
        # is 目录
        for x in os.listdir(pathName):
            readDir(pathDict['titleList'], os.path.join(pathName, x), x)
    if os.path.isfile(pathName):
        # is 文件
        urlDict = {
            'name': dirName,
            'url': pathName
        }
        pathDict['urlList'].append(urlDict)

def writeFile(data):
    with open('./pathlist.js', 'w', encoding='utf8') as f:
    	f.write(data)

# for x in os.listdir('.'):
#     readDir(pathList, x, x)

readDir(pathList, 'assets', 'assets')

# wObj = {
#     'json': pathList
# }
print(pathList)
pathList = pathList[0]['titleList']

pathList = json.dumps(pathList, ensure_ascii=False)

# print(pathList)

writeFile(str(pathList))
