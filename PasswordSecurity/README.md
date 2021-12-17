## Installation

### git clone

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_server_express.git
```

### ./.npmrc

```txt
//npm.pkg.github.com/:_authToken=발급받은 ReadOnly_key
@kihyeon-hong:registry=https://npm.pkg.github.com/
```

### npm install

```bash
npm install
```

## Usage

### init

```js
const PasswordSecurityServer = require('@kihyeon-hong/password_security_server');
var pwd = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();
```

### pwd.passwordModelTrain(versionData, comment);

-   해당 버전으로 모델 학습을 수행한다.

#### code

```js
// passwordModel에 0.1이라는 디렉터리가 생성되며, 가중치와 모델 구조가 저장됨
pwd.passwordModelTrain('0.1', 'First Training Model');
```

#### result

```bash
// success
Model Train Start
epoch 0 { loss: 0.16097141802310944 } RMSE ->  0.4012124350305078
epoch 1 { loss: 0.0859527587890625 } RMSE ->  0.2931770093118874
epoch 2 { loss: 0.07562059909105301 } RMSE ->  0.274991998230954
epoch 3 { loss: 0.07314702123403549 } RMSE ->  0.2704570598709442
epoch 4 { loss: 0.07214268296957016 } RMSE ->  0.26859389972516157
epoch 5 { loss: 0.07183273881673813 } RMSE ->  0.26801630326668213
epoch 6 { loss: 0.07142296433448792 } RMSE ->  0.2672507517940556
Successfully saved the artifacts.

// error
Duplicate Version
```

### passwordModelDistribution(versionData, gatewayInfo, comment)

-   학습한 모델 배포를 위해 해당 버전의 폴더 위치를 반환한다.
-   해당 버전이 없다면 가장 최신 버전으로 반환한다.

#### code

```js
// 해당 코드는 해당 버전의 모델 위치만을 반환하며, 반환받은 위치로 가중치와 모델의 구조를 반환해줘야 함
pwd.passwordModelDistribution('0.1', 'localhost', 'Update Model');

// res.sendFile(pwd.passwordModelDistribution(req.query.versionData, '', req.query.comment) + `/model.json`);
// res.sendFile(pwd.passwordModelDistribution(req.query.versionData, '', req.query.comment) + `/weights.bin`);
```

#### result

```bash
C:/Users/passwordModel/0.1
```

### passwordDictUpdate(dictionary, comment)

-   학습에 새로운 유출된 비밀번호를 추가한다.

#### code

```js
// 학습, 검증에 'q1w2e3r4'이라는 유출된 비밀번호를 추가
pwd.passwordDictUpdate('q1w2e3r4', 'Update Leak password');
```

#### result

```bash
// success
```

### passwordModelParaUpdate(parameter)

-   학습을 위한 새로운 하이퍼 파라매터를 정의한다.

#### code

```js
var parameter = { node: 4, unit: [3, 5, 3, 1], activation: 'relu', epoch: 7, comment: 'test message.' };
pwd.passwordModelParaUpdate(parameter);
```

#### result

```bash
// success
```

### passwordModelComment(versionData, comment)

-   해당 버전의 새로운 코멘트를 수정한다.

#### code

```js
// 0.1 버전의 학습 모델의 코멘트를 'Update comment'로 변경
pwd.passwordModelComment('0.1', 'Update comment');
```

#### result

```bash
// success
Update comment complete

// error
No Search Model Version
```

### passwordModelDelete(versionData)

-   해당 버전의 모델을 삭제한다.

#### code

```js
pwd.passwordModelDelete('0.1');
```

#### result

```
// success
Delete 0.1 model

//error
No Search Model Version
```

### passwordModelVersion(versionData)

-   해당 버전 모델의 정보를 확인한다.
-   파라매터를 입력하지 않으면 모든 모델의 정보를 반환한다.

#### code

```js
pwd.passwordModelVersion(); // 모든 모델 정보 반환
pwd.passwordModelVersion('0.1'); // 0.1 버전의 모델 정보 반환
```

#### result

```json
[
    {
        "version": "0.1",
        "dictionary": "0.1",
        "date": "2021-06-28T04:29:01.109Z",
        "accuracy": 0.912,
        "loss": 0.07130961120128632,
        "comment": "new comment"
    },
    {
        "version": "0.2",
        "dictionary": "0.1",
        "date": "2021-07-05T01:42:33.974Z",
        "accuracy": 0.90765,
        "loss": 0.07142296433448792,
        "comment": "new comment"
    }
]
```
