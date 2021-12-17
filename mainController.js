const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const PasswordSecurityServer = require('./PasswordSecurity');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/passwordModelDistributionWeight', (req, res, next) => {
  const name = 'weights.bin';
  var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();

  res.setHeader('Content-Disposition', `attachment; filename=${name}`);
  res.sendFile(pwd.passwordModelDistribution(req.query.versionData, req.query.comment) + `/weights.bin`);
});

app.get('/passwordModelDistributionModel', (req, res, next) => {
  const name = 'model.json';
  var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();

  res.setHeader('Content-Disposition', `attachment; filename=${name}`);
  res.sendFile(pwd.passwordModelDistribution(req.query.versionData, req.query.comment) + `/model.json`);
});

app.post('/passwordDictUpdate', (req, res, next) => {
  var query = req.body;
  var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();

  res.send(pwd.passwordDictUpdate(query.dictionary, query.comment));
});

app.post('/passwordModelParaUpdate', (req, res, next) => {
  var query = req.body;
  var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();

  res.send(pwd.passwordModelParaUpdate(query));
});

// Etc
app.get('/passwordModelTrain', (req, res, next) => {
  var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();
  res.send(pwd.passwordModelTrain(req.query.versionData, req.query.comment));
});

app.get('/passwordModelVersion', (req, res, next) => {
  var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();
  res.send(pwd.passwordModelVersion());
});

app.get('/passwordModelDelete', (req, res, next) => {
  var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();
  res.send(pwd.passwordModelDelete(req.query.versionData));
});

app.get('/passwordModelComment', (req, res, next) => {
  var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();
  res.send(pwd.passwordModelComment(req.query.versionData, req.query.comment));
});

app.listen(65001, () => {
  console.log(`Server running...`);
});
