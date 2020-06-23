//sql데이터베이스를 기반으로 한 로그인 시스템입니다.
//sql코드는 어렵지만 이상하게 활용을 하는 코드는 아니라서 그냥 다른거 만들때도 그대로 복붙해서 쓰면 됩니다.
function password_check(id, pass) {
    //데이터베이스를 생성하는 코드입니다.
    var db = openDatabase('mydb2', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        //기본적으로 tx에 select *을 통해 모든 데이터를 가져오기 위한 밑작업입니다.
        tx.executeSql('SELECT * FROM LOGS', [], function (_tx, results) {
            var len = results.rows.length, i;

            //데이터 번호를 통해 일일히 불러들입니다.
            for (i = 0; i < len; i++) {
                //아이디를 기준으로 아이디를 찾아내고, 데이터베이스에서 아이디를 찾아내면 비밀번호를 바로 비교합니다.
                if (results.rows.item(i).id == id && pass == results.rows.item(i).log) {
                    //기능삽입
                    return true;
                    break;
                } else {
                    //기능삽입
                    return false;
                }
            }
        }, null);
    });
}