const express =  require('express'),
      app = express(),
      aws = require('aws-sdk'),
      consign = require('consign');
      bodyParser = require('body-parser');

app.use(bodyParser.json());
aws.config.loadFromPath(__dirname + '/config.json');

let obj = {};
obj.sqs = new aws.SQS();
obj.url = "https://sqs.us-west-2.amazonaws.com/050956821976/FilaTeste";

consign()
  .include('SQS/api')
  .then('SQS/routes')
  .into(app, obj);


module.exports = app;
