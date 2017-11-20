# >>> [x for x in os.listdir('.') if os.path.isfile(x) and os.path.splitext(x)[1]=='.py']
# >>> [x for x in os.listdir('.') if os.path.isdir(x)]

import os

pathList = []

def readDir(childList, pathName, dirName):
    pathDict = {
        'name': dirName,
        'urlList': [],
        'childList': []
    }
    childList.append(pathDict)
    if os.path.isdir(pathName):
        # is 目录
        for x in os.listdir(pathName):
            readDir(pathDict['childList'], os.path.join(pathName, x), x)
    if os.path.isfile(pathName):
        # is 文件
        urlDict = {
            'name': dirName,
            'url': pathName
        }
        pathDict['urlList'].append(urlDict)

def writeFile(data):
    with open('./pathlist.py', 'w') as f:
    	f.write(data)

for x in os.listdir('.'):
    readDir(pathList, x, x)

print(pathList)

writeFile(str(pathList))
