/**
 * Created by rigel on 8/10/16.
 */
var express = require('express');
var app = express();
app.use(express.static('./'));
var server = app.listen(2112, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("example app listening at http://%s:%s", host, port);
});