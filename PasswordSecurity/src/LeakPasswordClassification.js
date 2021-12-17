const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

/*
 * LeakPasswordClassification
 * 유출 비밀번호 관리 모듈
 * @version: 1.0.0
 */
class LeakPasswordClassification {
    /*
     * 비밀번호 보안성 평가모델 유출 비밀번호 추가 기능
     * 새로운 유출 비밀번호 발생 시 이를 학습 데이터에 추가하기 위해 해당 비밀번호를 입력받는다. 만약 실패한다면 304 상태 메시지를 반환하며, 성공 시 200 상태 메시지를 반환한다.
     * @version: 1.0.0
     * @param: dictionary, comment
     * @return: state, comment
     */
    leakPasswordClassification(password, comment) {
        password = password.toString();

        if (password.split('\n').length != 1 || password.split(',').length != 1) {
            return {
                state: 304,
                comment: `${password}는 유효하지 않은 비밀번호`,
            };
        }

        /*
         * password에서 학습을 위해 특징을 추출하고, 이를 학습 데이터와 특징 추출 데이터 파일에 추가
         */
        var zxcvbnPoint =
            parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2) < 5
                ? parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2)
                : 4;
        var luds = parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) < 5 ? parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) : 4;
        var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(password)) < 3 ? 0 : 1;

        fs.appendFileSync(__dirname + '/../files/updateLeakPasswordFeatures.txt', password + ',' + zxcvbnPoint + ',' + luds + ',' + levenshteinPoint + ',' + 1 + '\n', 'utf8');
        fs.appendFileSync(__dirname + '/../lib/koreanZxcvbnString/files/wordDataToEng.txt', ',' + password, 'utf8');

        return {
            state: 200,
            comment: `유출 비밀번호 등록 완료`,
        };
    }

    /*
     * 비밀번호 보안성 평가모델 확습 데이터 특징 추출 기능
     * 학습을 위해 모든 유출된 비밀번호와 유출되지 않은 비밀번호의 특징을 추출하고 저장한다.
     * @version: 1.0.0
     * @param: x
     * @return: result json
     */
    leakPasswordsClassification() {
        var datas = fs.readFileSync(__dirname + '/../files/LeakData.txt', 'utf8');
        datas = datas.split('\n');

        var data = [];
        var value = [];

        for (let i = 0; i < datas.length; i++) {
            data[i] = datas[i].split(':')[0];
            value[i] = datas[i].split(':')[1];
        }

        var leakDatas = [];
        var leakValues = [];
        var notLeakDatas = [];
        var notLeakValues = [];

        var leakCount = 0;
        var notLeakCount = 0;

        for (let i = 0; i < datas.length; i++) {
            if (value[i] == 0) {
                notLeakDatas[notLeakCount] = data[i];
                notLeakValues[notLeakCount] = value[i];
                notLeakCount += 1;
            } else {
                leakDatas[leakCount] = data[i];
                leakValues[leakCount] = value[i];
                leakCount += 1;
            }
        }

        fs.writeFileSync(__dirname + '/../files/updateLeakPasswordFeatures.txt', '', 'utf8');

        for (let i = 0; i < leakDatas.length; i++) {
            var zxcvbnPoint =
                parseInt(parseInt(koreanZxcvbn(leakDatas[i]).score * 2 + comparePoint.frequencyComparePoint(leakDatas[i])) / 2) < 5
                    ? parseInt(parseInt(koreanZxcvbn(leakDatas[i]).score * 2 + comparePoint.frequencyComparePoint(leakDatas[i])) / 2)
                    : 4;
            var luds = parseInt(parseInt(ludsPoint.ludsPoint(leakDatas[i]).nScore) / 20) < 5 ? parseInt(parseInt(ludsPoint.ludsPoint(leakDatas[i]).nScore) / 20) : 4;
            var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(leakDatas[i])) < 3 ? 0 : 1;

            fs.appendFileSync(__dirname + '/../files/updateLeakPasswordFeatures.txt', leakDatas[i] + ',' + zxcvbnPoint + ',' + luds + ',' + levenshteinPoint + ',' + leakValues[i] + '\n', 'utf8');
        }

        fs.writeFileSync(__dirname + '/../files/updateNotLeakPasswordFeatures.txt', '', 'utf8');

        for (let i = 0; i < notLeakDatas.length; i++) {
            var zxcvbnPoint =
                parseInt(parseInt(koreanZxcvbn(notLeakDatas[i]).score * 2 + comparePoint.frequencyComparePoint(notLeakDatas[i])) / 2) < 5
                    ? parseInt(parseInt(koreanZxcvbn(notLeakDatas[i]).score * 2 + comparePoint.frequencyComparePoint(notLeakDatas[i])) / 2)
                    : 4;
            var luds = parseInt(parseInt(ludsPoint.ludsPoint(notLeakDatas[i]).nScore) / 20) < 5 ? parseInt(parseInt(ludsPoint.ludsPoint(notLeakDatas[i]).nScore) / 20) : 4;
            var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(notLeakDatas[i])) < 3 ? 0 : 1;

            fs.appendFileSync(
                __dirname + '/../files/updateNotLeakPasswordFeatures.txt',
                notLeakDatas[i] + ',' + zxcvbnPoint + ',' + luds + ',' + levenshteinPoint + ',' + notLeakValues[i] + '\n',
                'utf8'
            );
        }

        return {
            state: 200,
            comment: '유출 비밀번호 예측모델 학습 데이터 특징 추출 완료',
        };
    }
}

module.exports.LeakPasswordClassification = LeakPasswordClassification;
