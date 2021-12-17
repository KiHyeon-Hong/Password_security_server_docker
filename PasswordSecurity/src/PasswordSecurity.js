const fs = require('fs');

const PasswordModelTrain = require(__dirname + '/PasswordModelTrain.js');
const PasswordModelDistribution = require(__dirname + '/PasswordModelDistribution.js');
const LeakPasswordClassification = require(__dirname + '/LeakPasswordClassification.js');
const ModelVersionManagement = require(__dirname + '/ModelVersionManagement.js');
const PasswordModelParaUpdate = require(__dirname + '/PasswordModelParaUpdate.js');

/*
 * PasswordSecurity
 * 비밀번호 보안성 평가모델 인터페이스 모듈
 * @version: 1.0.0
 */
class PasswordSecurity {
    /*
     * 비밀번호 보안성 평가모델 학습 기능
     * 비밀번호 보안성 평가모델을 학습한다. 만약 학습을 요청한 모델의 버전이 중복이라면 301 상태 메시지와 함께 학습을 중지하며, 학습이 성공적으로 시작될 경우 200 상태 메시지를 반환한다.
     * @version: 1.0.0
     * @param: versionData, comment
     * @return: state, comment
     */
    passwordModelTrain(versionData, comment) {
        return new PasswordModelTrain.PasswordModelTrain().passwordModelTrain(versionData, comment);
    }

    /*
     * 비밀번호 보안성 평가모델 디렉터리 위치 반환 기능
     * 학습된 가중치와 모델의 구조가 존재하는 디렉터리 위치를 반환한다. 만약 해당 버전이 없다면 가장 최근에 학습된 모델의 위치를 반환한다.
     * @version: 1.0.0
     * @param: versionData, gatewayInfo, comment
     * @return: path
     */
    passwordModelDistribution(versionData, gatewayInfo, comment) {
        return new PasswordModelDistribution.PasswordModelDistribution().passwordModelDistribution(versionData, gatewayInfo, comment);
    }

    /*
     * 비밀번호 보안성 평가모델 유출 비밀번호 추가 기능
     * 새로운 유출 비밀번호 발생 시 이를 학습 데이터에 추가하기 위해 해당 비밀번호를 입력받는다. 만약 실패한다면 304 상태 메시지를 반환하며, 성공 시 200 상태 메시지를 반환한다.
     * @version: 1.0.0
     * @param: dictionary, comment
     * @return: state, comment
     */
    passwordDictUpdate(dictionary, comment) {
        var pwd = new LeakPasswordClassification.LeakPasswordClassification();
        return pwd.leakPasswordClassification(dictionary, comment);
    }

    /*
     * 비밀번호 보안성 평가모델 학습 파라매터 수정 기능
     * 모델 학습을 위한 하이퍼 파라매터를 수정한다. 구성은 은닉층의 수, 노드 수, 활성화 함수, 학습 횟수를 변경 가능하다. 성공 시 200 상태 메시지를 반환한다.
     * @version: 1.0.0
     * @param: parameter
     * @return: state, comment
     */
    passwordModelParaUpdate(parameter) {
        var pwd = new PasswordModelParaUpdate.PasswordModelParaUpdate();
        return pwd.passwordModelParaUpdate(parameter.node, parameter.unit, parameter.activation, parameter.epoch, parameter.comment, parameter);
    }

    /*
     * 비밀번호 보안성 평가모델 학습 코멘트 변경 기능
     * 이미 학습된 모델의 코멘트를 변경한다. 실패 시 303 상태 메시지를 반환하며, 성공 시 200 상태 메시지를 반환한다.
     * @version: 1.0.0
     * @param: versionData, comment
     * @return: state, comment
     */
    passwordModelComment(versionData, comment) {
        var pwd = new ModelVersionManagement.ModelVersionManagement();
        return pwd.passwordModelComment(versionData, comment);
    }

    /*
     * 비밀번호 보안성 평가모델 삭제 기능
     * 해당 버전에 해당하는 모델의 가중치와 구조를 삭제한다. 실패 시 307 상태 메시지를 반환하며, 성공 시 200 상태 메시지를 반환한다.
     * @version: 1.0.0
     * @param: versionData
     * @return: state, comment
     */
    passwordModelDelete(versionData) {
        var pwd = new ModelVersionManagement.ModelVersionManagement();
        return pwd.passwordModelDelete(versionData);
    }

    /*
     * 비밀번호 보안성 평가모델 버전 확인 기능
     * 해당 버전의 비밀번호 보안성 평가모델의 정보를 반환한다. 만약 해당 버전의 모델이 없거나 파라매터를 입력하지 않았을 경우에는 모든 모델의 정보를 반환한다.
     * @version: 1.0.0
     * @param: versionData
     * @return: version info
     */
    passwordModelVersion(versionData) {
        var pwd = new ModelVersionManagement.ModelVersionManagement();
        return pwd.passwordModelVersion(versionData);
    }

    /*
     * 로그 정보 제공 기능
     * @version: 0.0.1
     * @param: x
     * @return: x
     */
    getLog(level, startDate, finishDate) {
        return 'getLog';
    }
}

module.exports.PasswordSecurity = PasswordSecurity;
