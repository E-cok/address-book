//아이디가 이미 존재하는지 확인하고 없으면 sql에 값을 삽입합니다.

//일단은 체크 먼저 합니다. 체크를 하고 아이디가 없음을 확인하면  join함수를 실행해서 값을 삽입합니다.

//id와 pass는 웬만해서는 스트링으로 넣어주세요.
function Valid_check(id, pass){
	var db = openDatabase('mydb2', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGS', [], function (_tx, results) {
            var len = results.rows.length, i;

            for (i = 0; i < len; i++) {
                if (results.rows.item(i).id == id) {
					//기능삽입(아이디가 존재할경우)
                    break;
                } else {
					join(id, pass);
                }
            }
        }, null);
    });
}

function join(id, pass) {
    var db = openDatabase('mydb2', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {

        tx.executeSql('INSERT INTO LOGS (id,log) VALUES (?, ?'), [id, pass];
    });
}