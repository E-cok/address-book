function data_delete(name) {
    //삭제할 데이터를 검색합니다.
    var db = openDatabase('table', '1.0', 'test', 5 * 1024 * 1024);
    //데이터베이스를 생성합니다.
    db.transaction(function (tx) {
        //테이블의 모든 값을 result에 리스트로 불러옵니다.
        tx.executeSql("select * from log", [], function (tx, result) {
            //리스트를 전부 읽어서 값이 존재하는지 확인합니다.
            for (var i = 0; i < result.rows.length; i++) {
                if (result.rows.item(i).name == name) {
                    //삭제할 데이터를 찾은경우 함수 호출
                    delete_(name);
                    return;
                } if (i + 1 == result.rows.length) {
                    //삭제할 데이터가 존재하지 않는경우
                    return;
                }
            }
        });
    });
}

function delete_(name) {
    //테이블에서 바로 삭제합니다.
    var db = openDatabase('table', '1.0', 'test', 5 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM log WHERE name=?', [name]);

    });
}