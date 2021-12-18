## Installation

## git clone

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_server_docker.git
```

## Docker images

```bash
docker build . -t passwordsecurityserver
docker run -p 65001:65001 -d passwordsecurityserver

docker exec -it <container ID> /bin/bash
```

## Document

### passwordModelTrain

- 비밀번호 보안성 평가모델 학습 API

```text
http://192.168.0.22:65001/passwordModelTrain?versionData=0.2&comment=TestComment
```

```json
{
  "state": 200,
  "comment": "0.2 model 학습 시작"
}
```

### passwordModelVersion

- 비밀번호 보안성 평가모델 버전확인 API

```text
http://192.168.0.22:65001/passwordModelVersion
```

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

```text
http://192.168.0.22:65001/passwordModelDelete?versionData=0.2
```

```json
{
  "state": 200,
  "comment": "0.2 model 삭제 완료"
}
```

### passwordModelTrain

- 비밀번호 보안성 평가모델 코멘트 변경 API

```text
http://192.168.0.22:65001/passwordModelComment?versionData=0.1&comment=newComment
```

```json
{
  "state": 200,
  "comment": "0.1 model 코멘트 수정 완료"
}
```
