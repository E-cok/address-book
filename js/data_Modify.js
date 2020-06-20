//데이터를 수정하는 함수입니다. 만약 입력받지 못한다면 null을 대신 입력시킨다.
function data_modify(name, job, email, call, memo) {
    var db = openDatabase('table', '1.0', 'test', 5 * 1024 * 1024);

    db.transaction(function (tx) {
        //name을 기준으로 값을 찾아냅니다.
        tx.executeSql('update log set job=?,email=?,call=?,memo=? where name=?', [job, email, call, memo, name], function (tx, rx) { },
            function (error) {
                return false;
            });
    });
}