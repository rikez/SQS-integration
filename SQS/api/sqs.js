let api = {};
let async = require('async');


module.exports = (app, options) => {
  api.sendMassData = (req, res) => {
    let ini = new Date();
    let res1 = [];
    let res2 = [];
    let res3 = [];
    let res4 = [];
    let res5 = [];
    async.parallel([
        function(callback) {
          for(var i = 0; i < 50000; i++) {
              var params = {
                  MessageAttributes: {
                    "Title": {
                      DataType: "String",
                      StringValue: "Testing nodejs SQS Implementation"
                     },
                    "Author": {
                      DataType: "String",
                      StringValue: "Interns"
                     },
                    "WeeksOn": {
                      DataType: "Number",
                      StringValue: "6"
                     }
                   },
                  MessageBody: req.body.msg,
                  QueueUrl: options.url,
                  DelaySeconds: 0
              };
              options.sqs.sendMessage(params, function(err, data) {
                  if(!!err) callback(err);
                  else res1.push(data);
              });
            }
            callback(null, res1);
        },
        function(callback) {
          for(var i = 0; i < 10000; i++) {
              var params = {
                  MessageAttributes: {
                    "Title": {
                      DataType: "String",
                      StringValue: "Testing nodejs SQS Implementation"
                     },
                    "Author": {
                      DataType: "String",
                      StringValue: "Interns"
                     },
                    "WeeksOn": {
                      DataType: "Number",
                      StringValue: "6"
                     }
                   },
                  MessageBody: req.body.msg,
                  QueueUrl: options.url,
                  DelaySeconds: 0
              };
              options.sqs.sendMessage(params, function(err, data) {
                  if(!!err) callback(err);
                  else res2.push(data);
              });
            }
            callback(null, res2);
        },
        function(callback) {
          for(var i = 0; i < 5000; i++) {
              var params = {
                  MessageAttributes: {
                    "Title": {
                      DataType: "String",
                      StringValue: "Testing nodejs SQS Implementation"
                     },
                    "Author": {
                      DataType: "String",
                      StringValue: "Interns"
                     },
                    "WeeksOn": {
                      DataType: "Number",
                      StringValue: "6"
                     }
                   },
                  MessageBody: req.body.msg,
                  QueueUrl: options.url,
                  DelaySeconds: 0
              };
              options.sqs.sendMessage(params, function(err, data) {
                  if(!!err) callback(err);
                  else res3.push(data);
              });
            }
            callback(null, res3);
        },
        function(callback) {
          for(var i = 0; i < 5000; i++) {
              var params = {
                  MessageAttributes: {
                    "Title": {
                      DataType: "String",
                      StringValue: "Testing nodejs SQS Implementation"
                     },
                    "Author": {
                      DataType: "String",
                      StringValue: "Interns"
                     },
                    "WeeksOn": {
                      DataType: "Number",
                      StringValue: "6"
                     }
                   },
                  MessageBody: req.body.msg,
                  QueueUrl: options.url,
                  DelaySeconds: 0
              };
              options.sqs.sendMessage(params, function(err, data) {
                  if(!!err) callback(err);
                  else res4.push(data);
              });
            }
            callback(null, res4);
        },
        function(callback) {
          for(var i = 0; i < 5000; i++) {
              var params = {
                  MessageAttributes: {
                    "Title": {
                      DataType: "String",
                      StringValue: "Testing nodejs SQS Implementation"
                     },
                    "Author": {
                      DataType: "String",
                      StringValue: "Interns"
                     },
                    "WeeksOn": {
                      DataType: "Number",
                      StringValue: "6"
                     }
                   },
                  MessageBody: req.body.msg,
                  QueueUrl: options.url,
                  DelaySeconds: 0
              };
              options.sqs.sendMessage(params, function(err, data) {
                  if(!!err) callback(err);
                  else res5.push(data);
              });
            }
            callback(null, res5);
        }
    ],
    // optional callback
    function(err, results) {
      let fim = new Date();
        res.send(`Data início ${ini} e Data fim ${fim}`);
    });
  }

  api.send = (req, res) => {
    var params = {
        MessageAttributes: {
          "Title": {
            DataType: "String",
            StringValue: "Testing nodejs SQS Implementation"
           },
          "Author": {
            DataType: "String",
            StringValue: "Interns"
           },
          "WeeksOn": {
            DataType: "Number",
            StringValue: "6"
           }
         },
        MessageBody: req.body.msg,
        QueueUrl: options.url,
        DelaySeconds: 0
    };
    options.sqs.sendMessage(params, function(err, data) {
        if(!!err) return res.status(400).send({erro: err});
        else return res.status(200).json({ respostaSQS : data });
    });
  }

  api.receive = (req, res) => {
    let ini = new Date();
    var paramsGetQueue = {
       AttributeNames: [
          "ApproximateNumberOfMessages"
       ],
       QueueUrl: options.url
    };
    var params = {
       AttributeNames: [
          "SentTimestamp"
       ],
       MaxNumberOfMessages: 10,
       MessageAttributeNames: [
          "All"
       ],
       QueueUrl: options.url,
       VisibilityTimeout: 0,
       WaitTimeSeconds: 0
    };
    let size;
    async.parallel([
    function(callback) {
      options.sqs.getQueueAttributes(paramsGetQueue, function(err, data) {
        if(err) { return res.status(400).send(err); }
        else {
          size = data['Attributes'].ApproximateNumberOfMessages;
        }
      });
    }],
    function(err, results) {
            let fim = new Date();
              res.send(`Data início ${ini} e Data fim ${fim}`);
    });
}

  return api;
}
