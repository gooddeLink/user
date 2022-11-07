/* Module Import */
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
const router=require("./router");
var fileupload = require("express-fileupload");

app.set('views', __dirname + '/../src/views');
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('/../src/routes'));
app.use(fileupload());

// app.use(express.urlencoded({extended: true}));//body-parser 대신
// app.use(express.json());//body-parser 대신

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false}));

app.use("/api", router);

/* Start Express Server */
var port=3001;
app.listen(port, function () {
    console.log(`http://localhost:${port}/api app listening on port ${port}!`);
});

