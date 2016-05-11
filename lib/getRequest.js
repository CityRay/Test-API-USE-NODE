/*
* @Author: RayLin
* @Date:   2016-03-25 16:24:48
* @Last Modified by:   RayLin
* @Last Modified time: 2016-03-31 17:42:14
*/

var request = require('request');

module.exports = function(uri, name, callback){

    //Request GET API
    request({
        method: 'GET',
        uri: uri,
        timeout: 7000,
        time: true,
        gzip: true,
        headers: {
            'User-Agent': 'request'
        }
        },
        function (error, response, body) {
            // body is the decompressed response body
            if(!error){
                // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
                // console.log('Href: ' + response.request.uri.href);
                // console.log('the decoded data is: ' + JSON.stringify(body));
                // console.log('time: ' + response.elapsedTime);

                console.log('=========Uri: ' + uri + '  is Finish!=========End\n');
                callback(null, {
                    'name': name,
                    'statusCode': response.statusCode,
                    'URI': uri,
                    'status': 'Success',
                    'ElapsedTime': response.elapsedTime,
                    'Server': response.headers.server,
                    'Date': response.headers.date
                });
                //END
            }else{
                console.log(error);
                console.log('=========Uri: ' + uri + '  is Finish!=========End, But Error\n');
                callback(null, {
                    'statusCode': 500,
                    'URI': uri,
                    'status': error
                });
            }

        })
        .on('data', function(data) {
            //decompressed data as it is received
            //console.log('decoded chunk: ' + data);
        })
        .on('response', function(response) {
            console.log('=========Start Uri : ' + uri + '  =========Start');

            // unmodified http.IncomingMessage object
            response.on('data', function(data) {
                // compressed data as it is received
                //console.log('received ' + data.length + ' bytes of compressed data');
            });

        });

};

// ======================================================================================
// SAMPLE CODE ==========================================================================
// ======================================================================================
//
// request('http://dev.gugustore.com/', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     //console.log(response);
//     fs.writeFile("./log/response.js", response, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//     });

//   }else{
//     console.log('error: ' + response.statusCode)
//   }
// });

// Request GET WebSite
// request({
//     method: 'GET',
//     uri: 'https://www.gugustore.com/',
//     gzip: true,
//     timeout: 9000,
//     headers: {
//         'User-Agent': 'request'
//     },
//     time: true
//     },
//     function (error, response, body) {
//       // body is the decompressed response body
//       console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
//       // console.log('the decoded data is: ' + body);
//       console.log('time: ' + response.elapsedTime);

//     })
//     .on('data', function(data) {
//         console.log('data');

//         // decompressed data as it is received
//         //console.log('decoded chunk: ' + data)
//     })
//     .on('response', function(response) {

//         // unmodified http.IncomingMessage object
//         response.on('data', function(data) {
//             // compressed data as it is received
//             console.log('received ' + data.length + ' bytes of compressed data');

//         });


//         fs.writeFile("./log/response.js", JSON.stringify(response), function(err) {
//         if(err) {
//                 return console.log(err);
//             }
//             console.log("The file was saved!");
//         });


//     });

//Request GET API
// request({
//     method: 'GET',
//     uri: 'http://10.10.7.12/api/Notification/GetNotificationList/69?type=1&pageIndex=1&pageSize=10',
//     timeout: 9000,
//     time: true,
//     gzip: true,
//     timeout: 9000,
//     headers: {
//         'User-Agent': 'request'
//     }
//     },
//     function (error, response, body) {
//       // body is the decompressed response body
//       console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
//       console.log('the decoded data is: ' + body);
//       console.log('time: ' + response.elapsedTime);

//     })
//     .on('data', function(data) {
//         console.log('data');
//         // decompressed data as it is received
//         //console.log('decoded chunk: ' + data);
//     })
//     .on('response', function(response) {
//         // unmodified http.IncomingMessage object
//         response.on('data', function(data) {
//             // compressed data as it is received
//             console.log('received ' + data.length + ' bytes of compressed data');

//         });

//         fs.writeFile("./log/response.js", JSON.stringify(response), function(err) {
//         if(err) {
//                 return console.log(err);
//             }
//             console.log("The file was saved!");
//         });

//     });
//
// ======================================================================================
// SAMPLE CODE ==========================================================================
// ======================================================================================
