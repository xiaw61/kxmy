 // app/routes.js

// grab the nerd model we just created
var Houses = require('./models/horses');
var jf = require('jsonfile');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var methodOverride = require('method-override');
var fs = require('fs');

    module.exports = function(app) {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(methodOverride());
        app.post('/api/save_from_file',function (req, res, next) {
            var file = req.body;
            jf.readFile(file[filename], function(err, obj) {
                for(var i = 0; i < obj.length; i++) {
                    Houses.insert(obj[i], function (err, newDoc) {   // Callback is optional
                    });
                }
            })
            res.send('ok'); //
        });

        app.post('/api/save',multipartMiddleware,function (req, res, next) {
            
            //console.log("data");
            //console.log(record,req.files);
            
            //console.log("dasdsa"+req.files["path"]);
            fs.readFile(req.files.file.path, function (err, data) {
                // ...
                var record = req.body;
                var newPath = __dirname +"/../"+"/public/images/"+ req.files.file.path.split("/")[2];
                var Path ="images/"+ req.files.file.path.split("/")[2];
                //console.log(data);
                record["path"] = Path;
                console.log(record);
                fs.writeFile(newPath, data, function (err) {
                    //console.log(err)
                });

                Houses.insert(record, function (err, newDoc) {   // Callback is optional
                console.log(record);
                });
            });
             



            res.send('ok'); //
        });



        app.get('/api/get_all', function(req, res) {
            Houses.find({},function(err, house) {
                if (err)
                    res.send(err);
                res.json(house); // return all nerds in JSON format
            });
        });
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
