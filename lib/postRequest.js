/*
* @Author: RayLin
* @Date:   2016-03-25 16:24:48
* @Last Modified by:   RayLin
* @Last Modified time: 2016-05-11 10:35:42
*/

// Not Yet
//
//

var request = require('request');

module.exports = function(uri, postData, callback){

    //Request Post API
    request({
        method: 'POST',
        uri: uri,
        time: true,
        gzip: true,
        timeout: 5000,
        json: true,
        headers: {},
        body: postData
        },
        function (error, response, body) {
          // body is the decompressed response body
          if(!error){
            console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
            console.log('Href: ' + response.request.uri.href);
            //console.log('the decoded data is: ' + JSON.stringify(body));
            console.log('time: ' + response.elapsedTime);

            var savedata = {
                'postUrl': uri,
                'elapsedTime': response.elapsedTime,
                'postData': postData,
                'res': response
            };

            //responseHeader.push(savedata);

            console.log('=========Uri: ' + uri + '  is Finish!=========End\n');
            callback(null, uri + ' is Success!');

          }else{
            console.log(error);
            console.log('=========Uri: ' + uri + '  is Finish!=========End, But Error\n');
            callback(null, error);

          }

        })
        .on('data', function(data) {
            // console.log('data');
            // decompressed data as it is received
            // console.log('decoded chunk: ' + data);
        })
        .on('response', function(response) {
            console.log('Start Uri : ' + uri);

            // unmodified http.IncomingMessage object
            response.on('data', function(data) {
                // compressed data as it is received
                console.log('received ' + data.length + ' bytes of compressed data');
            });

        });

};
