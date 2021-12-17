const fs = require('fs');

/*
 * PasswordModelParaUpdate
 * 비밀번호 보안성 평가모델 파라매터 관리 모듈
 * @version: 1.0.0
 */
class PasswordModelParaUpdate {
    /*
     * 비밀번호 보안성 평가모델 학습 파라매터 수정 기능
     * 모델 학습을 위한 하이퍼 파라매터를 수정한다. 구성은 은닉층의 수, 노드 수, 활성화 함수, 학습 횟수를 변경 가능하다. 성공 시 200 상태 메시지를 반환한다.
     * @version: 1.0.0
     * @param: parameter
     * @return: state, comment
     */
    passwordModelParaUpdate(node, units, activation, epochs, comment, parameter) {
        parameter = JSON.stringify(parameter);
        fs.writeFileSync(__dirname + '/../files/passwordModelTrainPara.json', parameter, 'utf8');

        return {
            state: 200,
            comment: `하이퍼 파라매터 수정 완료`,
        };
    }
}

module.exports.PasswordModelParaUpdate = PasswordModelParaUpdate;
