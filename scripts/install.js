var http = require('http');
var fs = require('fs');
var AdmZip = require('adm-zip');
var path = require('path');

var download_url = 'http://www.angusj.com/resourcehacker/resource_hacker.zip';
var dir_path = path.join(__dirname,'../bin/');
var zip_path = path.join(__dirname,'../bin/resource_hacker.zip');
var bin_path = path.join(__dirname,'../bin/ResourceHacker.exe');

if(!fs.existsSync(dir_path)){
  fs.mkdirSync(dir_path);
}

if(!fs.existsSync(bin_path)) {
	console.log('Downloading ResourceHacker by Angus Johnson...')
	var file = fs.createWriteStream(zip_path);
	var request = http.get(download_url, function(response) {
	  response.pipe(file);
	  file.on('finish', function() {
	    file.close(function(err){
	      var zip  = new AdmZip(zip_path);
	      zip.extractAllTo(dir_path, true);
	      console.log('Download complete');
	      process.exit(0);
	    });
	  });
	}).on('error', function(err) { // Handle errors
	  fs.unlink(zip_path);
	  console.error(err.message);
	  process.exit(-1);
	});
}