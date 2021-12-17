// const PasswordSecurityServer = require('./PasswordSecurity');
const PasswordSecurityServer = require('@kihyeon-hong/password_security_server');

var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();

// 현재 예측모델 목록 확인
console.log(pwd.passwordModelVersion());

// 예측모델 학습
// console.log(pwd.passwordModelTrain('0.1', 'model test'));
// console.log(pwd.passwordModelTrain('0.2', 'model test'));

// 현재 예측모델 목록 확인
// console.log(pwd.passwordModelVersion());

// 예측모델 삭제
// console.log(pwd.passwordModelDelete('0.3'));
// console.log(pwd.passwordModelDelete('0.1'));

// 관리자 comment 변경
// console.log(pwd.passwordModelComment('0.1', 'new comment'));

// 현재 예측모델 목록 확인
// console.log(pwd.passwordModelVersion());

// console.log(pwd.passwordModelTest());
