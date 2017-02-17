module.exports = (app) => {
  let api = app.SQS.api.sqs;
  app.post('/send', api.sendMassData);
  app.get('/receive', api.receive);
}
