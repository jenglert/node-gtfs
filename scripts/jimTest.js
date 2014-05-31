var request = require('request')
  , exec = require('child_process').exec
  , fs = require('fs')
  , path = require('path')
  , csv = require('csv')
  , async = require('async')
  , unzip = require('unzip')
  , downloadDir = 'jims-downloads'
  , q;

  request('http://gtfs.s3.amazonaws.com/path_20120517_1620.zip', processFile).pipe(fs.createWriteStream(downloadDir + '/latest.zip'));

      function processFile(e, response, body){
        if(response && response.statusCode != 200){ done(new Error('Couldn\'t download files')); }
        console.log('Download successful');
  	 
        var rs = fs.createReadStream(downloadDir + '/latest.zip').on('error', done);
        rs.pipe(unzip.Extract({ path: downloadDir }).on('close', done).on('error', done));
      }

      function done(err) {
        if (err){ 
        	console.log("Some error:" + err);
        } else { 
			console.log("It is done!");
        }
      }