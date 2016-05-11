/*
* @Author: RayLin
* @Date:   2016-03-24 16:27:40
* @Last Modified by:   RayLin
* @Last Modified time: 2016-03-31 17:45:48
*/

var fs = require('fs'),
    async = require('async'),
    schedule = require('node-schedule'),
    dataList = require('./data/data_list'),
    requestGet = require('./lib/getRequest'),
    requestPost = require('./lib/postRequest');

const args = parseInt(process.argv.slice(2), 10);
//console.log(process.argv.slice(2));

var responseHeader = [],
    cdt = new Date(),
    startCount = 0,
    stopCount = args || 10;

const DETAILS_FILE = './log/Get_' + cdt.getFullYear() + '_' + (cdt.getMonth() + 1) + cdt.getDate() + '_' + cdt.getHours() + cdt.getMinutes() + '.json',
      RESULT_FILE = './log/RESULT.json',
      RESULT_FILE_ByDate = './log/RESULT_' + cdt.getFullYear() + (cdt.getMonth() + 1) + cdt.getDate() + '.json';


// requestPost('http://10.10.7.12/api/Product/UpdatePromote', postData);
// async.mapLimit(dataList.postList, 2, function (res, callback) {
//   requestPost(res.uri, res.data, callback);
//   //console.log(res.uri);

// }, function (err, result) {
//   console.log('Async Final : ');
//   console.log(result);
// });
//


var asyncRunGetURI = function(){
    async.mapLimit(dataList.getList, 2, function (res, callback) {
      requestGet(res.uri, res.description, callback);

    }, function (err, result) {
        console.log('===================================================================================================================');
        console.log('Async Final Result: Start');
        console.log('===================================================================================================================\n');
        //console.log(result);
        responseHeader.push(result);
        console.log(responseHeader);
        console.log('===================================================================================================================');
        console.log('Async Final Result: END');
        console.log('===================================================================================================================');

        //Write to File
        if(startCount === stopCount){
            var calnum = [],
                oldtime = [],
                calunmDatas = [];

            for(var datas in responseHeader){
                for(var data in responseHeader[datas]){
                    //console.log(responseHeader[datas][data]);
                    if(responseHeader[datas][data].hasOwnProperty('statusCode') && responseHeader[datas][data].statusCode !== 500){
                        if(calnum[data]){
                            oldtime[data].push(responseHeader[datas][data].ElapsedTime);
                            calnum[data] = {
                                'totalTime': calnum[data].totalTime + responseHeader[datas][data].ElapsedTime,
                                'length': calnum[data].length + 1,
                                'oldTime': oldtime[data]
                            };

                        }else{
                            oldtime[data] = [responseHeader[datas][data].ElapsedTime];
                            calnum[data] = {
                                'totalTime': responseHeader[datas][data].ElapsedTime,
                                'length': 1,
                                'oldTime': oldtime[data]
                            };
                        }
                    }
                }
            }
            //console.log(calnum);

            for(var c in calnum){
                calunmDatas.push({
                    'Name': responseHeader[0][c].name,
                    'URI': responseHeader[0][c].URI,
                    'TotalTime': calnum[c].totalTime,
                    'AverageTime': Math.floor(calnum[c].totalTime / calnum[c].length),
                    'SuccessLength': calnum[c].length,
                    'OldTime': calnum[c].oldTime,
                    'SERVER': responseHeader[0][c].Server,
                    'COUNT': stopCount,
                    'index': parseInt(c, 10) + 1
                });
            }

            fs.writeFile(DETAILS_FILE, JSON.stringify(responseHeader), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("\nThe file " + DETAILS_FILE + " was saved!");
            });

            if (fs.existsSync(RESULT_FILE_ByDate)) {
                //console.log('FILE exists');
                fs.readFile(RESULT_FILE_ByDate, 'utf8', function (err, data) {
                    if (err) throw err;

                    var getData = JSON.parse(data);
                    for(var d in getData){
                        getData[d].TotalTime += calnum[d].totalTime;
                        getData[d].COUNT += stopCount;
                        getData[d].SuccessLength += calnum[d].length;
                        getData[d].OldTime = getData[d].OldTime.concat(calnum[d].oldTime);
                        getData[d].AverageTime = Math.floor(getData[d].TotalTime / getData[d].SuccessLength);
                    }

                    fs.writeFile(RESULT_FILE_ByDate, JSON.stringify(getData), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log("\nThe " + RESULT_FILE_ByDate + " file was saved!");
                    });

                });

            }else{
                //console.log('FILE no exists');
                fs.writeFile(RESULT_FILE_ByDate, JSON.stringify(calunmDatas), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("\nThe " + RESULT_FILE_ByDate + " file was saved!");
                });
            }

        }

    });
};

//Cron JOB
var j = schedule.scheduleJob('*/1 * * * *', function(){
    console.log('START TO RUN GET URI!!!');
    startCount++;
    asyncRunGetURI();

    if(startCount === stopCount){
        j.cancel();
    }
});
