const express = require('express');
const Project = require('./api/model/project');
const app = express();
const projectRoute = require('./api/routes/project')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const SortRoute = require('./api/routes/sort');
const userRoute = require('./api/routes/user');
const searchRoute = require('./api/model/search')


const MongoClient = require('mongodb').MongoClient

// const SortRoute = require('./api/routes/sort');

app.use(express.json())
var test
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')

mongoose.connection.on('error', err => {
    console.log('connection failed')
});
mongoose.connection.on('connected', connected => {
    console.log('connection connected')

});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/project', projectRoute)
app.use('/user', userRoute)
app.use('/sort', SortRoute)



app.get('/search', (req, res) => {
    var re = new RegExp(req.params.Reason, req.params.State);
    try {
        Project.find({ $or: [{ Reason: re }, { State: re }] }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render({ data: data });
            }
        })
    } catch (error) {
        console.log(error);
    }
});
// app.get("/search/:reason", function(req, res) {
//     var regex = new RegExp(req.params.reason, 'i');
//     Project.find({ Reason: regex }).then(result) => {
//         res.status(200).json(result)

//     })
// })




module.exports = app;