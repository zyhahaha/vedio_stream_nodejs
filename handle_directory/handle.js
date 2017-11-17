var fs = require("fs");
var path = require("path");
var rootPath = path.resolve();
var filePath = path.resolve() + '/assets';
var fileArr = [];
var fileObj = {};

let rootArr = [];

fs.readdir(filePath, function (err, files) {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(function (filename) {
        fs.stat(path.join(filePath, filename), function (err, stats) {
            if (err) throw err;
            //文件
            if (stats.isFile()) {
                console.log(filename);
            } else if (stats.isDirectory()) {
                console.log(filename);
                readFile(path.join(filePath, filename), filename, rootArr, already);
            }
        });
    });
});

//获取文件数组
function readFile(readurl, name, testArr, next) {
    // console.log(name);
    let testObj = {
        title: name,
        urlList: [],
        titleList: []
    };
    testArr.push(testObj);
    fs.readdir(readurl, function (err, files) {
        if (err) { console.log(err); return; }

        files.forEach(function (filename) {
            let realFileName = path.join(readurl, filename);
            fs.stat(realFileName, function (err, stats) {
                if (err) throw err;
                //是文件
                if (stats.isFile()) {
                    testObj.urlList.push(realFileName);
                    writeFile(rootArr);
                } else if (stats.isDirectory()) {
                    readFile(realFileName, filename, testObj.titleList, already);
                }
            });
        });
    });
}

// already

function already(){
    console.log(fileObj);
}

// 写入到filelisttxt文件
function writeFile(data) {
    if(typeof data === 'object') data = JSON.stringify(data);
    data = 'var json = ' + data;
    fs.writeFile(rootPath + "/" + "filelist.js", data + '\n', function (err) {
        if (err) throw err;
        console.log("写入成功");
    });
}

//获取后缀名
function getdir(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}