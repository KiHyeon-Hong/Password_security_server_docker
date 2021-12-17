const fs = require('fs');

/*
 * ModelVersionManagement
 * 비밀번호 보안성 평가모델 버전 관리 모듈
 * @version: 1.0.0
 */
class ModelVersionManagement {
    /*
     * 비밀번호 보안성 평가모델 버전확인 기능
     * 선택된 버전의 비밀번호 보안성 평가모델이 있는지 탐색 후 결과를 반환한다.
     * @version: 1.0.0
     * @param: versionData
     * @return: Boolean
     */
    modelVersionValidation(versionData) {
        var json = fs.readFileSync(__dirname + '/../files/passwordModelVersionData.json', 'utf8');
        json = JSON.parse(json);

        versionData = versionData.toString();

        var flag = 0;
        for (let i = 0; i < json.length; i++) {
            if (json[i].version == versionData) flag = 1;
        }

        if (flag == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    /*
     * 최근 학습 비밀번호 보안성 평가모델 버전 확인 기능
     * 가장 최근에 학습된 비밀번호 평가모델의 버전을 반환한다.
     * @version: 1.0.0
     * @param: x
     * @return: versionData
     */
    latestVersionModel() {
        var json = fs.readFileSync(__dirname + '/../files/passwordModelVersionData.json', 'utf8');
        json = JSON.parse(json);

        return json[json.length - 1].version;
    }

    /*
     * 비밀번호 보안성 평가모델 버전 정보 추가 기능
     * 비밀번호 보안성 평가모델 학습 후 해당 모델의 버전과 정확도, 손실값 등을 기록한다.
     * @version: 1.0.0
     * @param: versionData, dictionaryVersion, accuracy, loss, comment
     * @return: state, comment
     */
    trainModelVersionWrite(versionData, dictionaryVersion, accuracy, loss, comment) {
        var json = fs.readFileSync(__dirname + '/../files/passwordModelVersionData.json', 'utf8');
        json = JSON.parse(json);

        json[json.length] = { version: versionData, dictionary: dictionaryVersion, date: new Date(), accuracy: accuracy, loss: loss, comment: comment };

        json = JSON.stringify(json);

        fs.writeFileSync(__dirname + '/../files/passwordModelVersionData.json', json, 'utf8');

        return {
            state: 200,
            comment: `${versionData} Model 등록 완료`,
        };
    }

    /*
     * 비밀번호 보안성 평가모델 버전 확인 기능
     * 해당 버전의 비밀번호 보안성 평가모델의 정보를 반환한다. 만약 해당 버전의 모델이 없거나 파라매터를 입력하지 않았을 경우에는 모든 모델의 정보를 반환한다.
     * @version: 1.0.0
     * @param: versionData
     * @return: version info
     */
    passwordModelVersion(versionData) {
        var json = fs.readFileSync(__dirname + '/../files/passwordModelVersionData.json', 'utf8');
        json = JSON.parse(json);

        for (let i = 0; i < json.length; i++) {
            if (json[i].version == versionData) {
                return json[i];
            }
        }

        return json;
    }

    /*
     * 비밀번호 보안성 평가모델 학습 코멘트 변경 기능
     * 이미 학습된 모델의 코멘트를 변경한다. 실패 시 303 상태 메시지를 반환하며, 성공 시 200 상태 메시지를 반환한다.
     * @version: 1.0.0
     * @param: versionData, comment
     * @return: state, comment
     */
    passwordModelComment(versionData, comment) {
        var json = fs.readFileSync(__dirname + '/../files/passwordModelVersionData.json', 'utf8');
        json = JSON.parse(json);

        versionData = versionData.toString();
        comment = comment.toString();

        if (comment.split("'").length != 1 || comment.split('"').length != 1) {
            return {
                state: 303,
                comment: `유효하지 않은 코멘트`,
            };
        }

        for (let i = 0; i < json.length; i++) {
            if (json[i].version == versionData) {
                json[i].comment = comment;

                json = JSON.stringify(json);
                fs.writeFileSync(__dirname + '/../files/passwordModelVersionData.json', json, 'utf8');

                return {
                    state: 200,
                    comment: `${versionData} model 코멘트 수정 완료`,
                };
            }
        }

        return {
            state: 303,
            comment: `${versionData} model이 존재하지 않음`,
        };
    }

    /*
     * 비밀번호 보안성 평가모델 삭제 기능
     * 해당 버전에 해당하는 모델의 가중치와 구조를 삭제한다. 실패 시 307 상태 메시지를 반환하며, 성공 시 200 상태 메시지를 반환한다.
     * @version: 1.0.0
     * @param: versionData
     * @return: state, comment
     */
    passwordModelDelete(versionData) {
        var json = fs.readFileSync(__dirname + '/../files/passwordModelVersionData.json', 'utf8');
        json = JSON.parse(json);

        if (json.length == 1) {
            return {
                state: 307,
                comment: `삭제 후 모델이 존재하지 않음`,
            };
        }

        versionData = versionData.toString();

        for (let i = 0; i < json.length; i++) {
            if (json[i].version == versionData) {
                json.splice(i, 1);

                json = JSON.stringify(json);
                fs.writeFileSync(__dirname + '/../files/passwordModelVersionData.json', json, 'utf8');

                return {
                    state: 200,
                    comment: `${versionData} model 삭제 완료`,
                };
            }
        }

        return {
            state: 307,
            comment: `${versionData} model이 존재하지 않음`,
        };
    }
}

module.exports.ModelVersionManagement = ModelVersionManagement;
