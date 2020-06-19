
function data_input(name, job, email, call, memo) {
    //우선 이름의 중복을 체크해 이름의 중복을 막습니다.
    var db = openDatabase('table', '1.0', 'test', 5 * 1024 * 1024);
    //데이터베이스를 생성합니다.
    db.transaction(function (tx) {
        //테이블을 생성합니다.
        tx.executeSql('CREATE TABLE IF NOT EXISTS log (name, job, email, call, memo)');
        //테이블의 모든 값을 result에 리스트로 불러옵니다.
        tx.executeSql("select * from log", [], function (tx, result) {
            //만약 테이블이 비어있는경우 먼저 값을 삽입할 수 있도록 합니다.
            if (result.rows.length == 0) {
                input(name, job, email, call, memo)
                return;
            } else {
                //리스트를 전부 읽어서 값이 존재하는지 확인합니다.
                for (var i = 0; i < result.rows.length; i++) {
                    if (result.rows.item(i).call == call) {
                        //값이 이미 존재하는 경우
                        return;
                    } if (i + 1 == result.rows.length) {
                        //값이 존재하지 않는 경우
                        input(name, job, email, call, memo);
                        return;
                    }
                }
            }

        });
    });
}

function input(name, job, email, call, memo) {
    //테이블에 값을 삽입하는 함수
    var db = openDatabase('table', '1.0', 'test', 5 * 1024 * 1024);

    db.transaction(function (tx) {
        //테이블을 불러와 값을 저장합니다.
        tx.executeSql('INSERT INTO log (name, job, email, call, memo) VALUES(?, ?, ?, ?, ?)', [name, job, email, call, memo]);
    });
}