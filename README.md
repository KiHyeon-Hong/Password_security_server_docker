# Installation

## git clone

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_server_docker.git
```

## Create Docker images

- Docker image 생성 및 실행
- Docker image 생성 및 실행을 위해 su 계정으로 접속

```bash
docker build . -t passwordsecurityserver
docker run -p 65001:65001 -d passwordsecurityserver
```

- Docker 환경 접속

```bash
docker exec -it <container ID> /bin/bash
```

## API Document

### passwordModelTrain

- 비밀번호 보안성 평가모델 학습 API
- 비밀번호 보안성 평가모델은 유출된 비밀번호가 새롭게 발생되는 등의 상황이 발생하면 학습을 다시 수행하여야 함
- 학습한 모델은 오버라이팅 되지 않으며, 버전으로 관리함

```text
# GET
http://localhost:65001/passwordModelTrain?versionData=0.2&comment=TestComment
```

- localhost:65001 : 비밀번호 보안성 학습모듈이 실행중인 IP와 포트
- versionData=0.2 : 학습을 요청할 모델 버전
- comment=TestComment : 코멘트

#### Return

```json
// 버전 중복
{
    "state": 301,
    "comment": "0.1은 중복된 버전"
}

// 학습 정상 동작
{
  "state": 200,
  "comment": "0.2 model 학습 시작"
}
```

### passwordModelVersion

- 비밀번호 보안성 평가모델 버전확인 API
- 현재 학습이 완료된 모든 평가모델의 버전, 학습이 완료된 시각, 정확도, 손실 값을 반환하는 기능

```text
# GET
http://localhost:65001/passwordModelVersion
```

- localhost:65001 : 비밀번호 보안성 학습모듈이 실행중인 IP와 포트

#### Return

```json
[
  {
    "version": "0.1",
    "dictionary": "0.1",
    "date": "2021-07-31T01:22:14.176Z",
    "accuracy": 0.951,
    "loss": 0.04312080144882202,
    "comment": "Test Model Code"
  },
  {
    "version": "0.2",
    "dictionary": "0.1",
    "date": "2021-12-18T11:51:08.862Z",
    "accuracy": 0.9511,
    "loss": 0.04328221455216408,
    "comment": "TestComment"
  }
]
```

### passwordModelDelete

- 비밀번호 보안성 평가모델 삭제 API
- 학습 과정에서 문제가 발생하거나, 더 이상 사용하지 않는 평가모델의 경우 모델을 삭제할 수 있어야 함
- 이러한 기능을 제공하는 API

```text
# GET
http://localhost:65001/passwordModelDelete?versionData=0.2
```

- localhost:65001 : 비밀번호 보안성 학습모듈이 실행중인 IP와 포트
- versionData=0.2 : 삭제를 요청할 평가모델 버전

#### Return

```json
{
  "state": 200,
  "comment": "0.2 model 삭제 완료"
}
```

### passwordModelTrain

- 비밀번호 보안성 평가모델 코멘트 변경 API
- 특정 버전의 평가모델의 코멘트를 수정할 일이 발생할 경우 제공하는 API

```text
# GET
http://localhost:65001/passwordModelComment?versionData=0.1&comment=newComment
```

- localhost:65001 : 비밀번호 보안성 학습모듈이 실행중인 IP와 포트
- versionData=0.1 : 코멘트를 변경할 평가모델 버전
- comment=newComment : 변경할 코멘트

#### Return

```json
{
  "state": 200,
  "comment": "0.1 model 코멘트 수정 완료"
}
```
