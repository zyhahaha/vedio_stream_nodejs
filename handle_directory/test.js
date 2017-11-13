var fs = require("fs");
var path = require("path");
var rootPath = path.resolve();
var filePath = path.resolve() + '/dir';
var fileArr = [];
var fileObj = {};

function already(){
    console.log(fileObj);
}

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
                fileObj[filename] = {};
                readFile(path.join(filePath, filename), filename, already);
            }
        });
    });
});


//获取后缀名
function getdir(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}

//获取文件数组
function readFile(readurl, name, next) {
    // console.log(name);
    fs.readdir(readurl, function (err, files) {
        if (err) { console.log(err); return; }

        files.forEach(function (filename) {
            fs.stat(path.join(readurl, filename), function (err, stats) {
                if (err) throw err;
                //是文件
                if (stats.isFile()) {
                    console.log(filename);
                    fileObj[name][filename] = filename;
                    writeFile(fileObj);
                } else if (stats.isDirectory()) {
                    console.log(filename);
                }
            });
        });
    });
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