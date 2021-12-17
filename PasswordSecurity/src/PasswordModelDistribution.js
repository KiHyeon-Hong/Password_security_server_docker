const fs = require('fs');

const ModelVersionManagement = require(__dirname + '/ModelVersionManagement.js');

/*
 * PasswordModelDistribution
 * 비밀번호 보안성 평가모델 배포 모듈
 * @version: 1.0.0
 */
class PasswordModelDistribution {
    /*
     * 비밀번호 보안성 평가모델 디렉터리 위치 반환 기능
     * 학습된 가중치와 모델의 구조가 존재하는 디렉터리 위치를 반환한다. 만약 해당 버전이 없다면 가장 최근에 학습된 모델의 위치를 반환한다.
     * @version: 1.0.0
     * @param: versionData, gatewayInfo, comment
     * @return: path
     */
    passwordModelDistribution(versionData, gatewayInfo, comment) {
        /*
         * Window, Linux 환경을 고려하기 위해 path 정보를 수정
         */
        var path = __dirname;

        var tempPath = path.split('\\');

        if (tempPath.length == 1) {
            tempPath = path.split('/');
        }

        path = tempPath;

        var filePath = '';
        for (let i = 0; i < path.length - 1; i++) {
            filePath = filePath + path[i] + '/';
        }

        versionData = versionData.toString();

        var pwd = new ModelVersionManagement.ModelVersionManagement();
        if (pwd.modelVersionValidation(versionData)) {
            console.log(`${filePath}passwordModel/${versionData}`);
            return `${filePath}passwordModel/${versionData}`;
        }

        console.log(`${filePath}passwordModel/${pwd.latestVersionModel()}`);
        return `${filePath}passwordModel/${pwd.latestVersionModel()}`;
    }
}

module.exports.PasswordModelDistribution = PasswordModelDistribution;
