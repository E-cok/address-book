function find_with_name() {
    var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);
    var name = document.getElementsByClassName("write")[0].value;
    var id = document.getElementsByClassName("write")[1].value;
    db.transaction(function (tx) {
        tx.executeSql("select * from list", [], function (tx, result) {

            var len = result.rows.length, i;

            for (i = 0; i < len; i++) {
                if (result.rows.item(i).name == name) {
                    if (result.rows.item(i).id == id) {
                        alert("비밀번호는(" + result.rows.item(i).password1 + ")입니다.");
                        window.close();
                        return;
                    } else {
                        alert('일치하지 않습니다.');
                        window.close();
                        return;
                    }
                } else if (len == i + 1) {
                    alert("존재하지 않는 이름입니다.");
                }
            }
        });
    });
}

function find_with_call() {
    var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);
    var tel = document.getElementsByClassName("write")[2].value;
    var id = document.getElementsByClassName("write")[3].value;

    db.transaction(function (tx) {
        tx.executeSql("select * from list", [], function (tx, result) {

            var len = result.rows.length, i;

            for (i = 0; i < result.rows.length; i++) {
                if (result.rows.item(i).id == id) {
                    if (result.rows.item(i).tel == tel) {
                        alert("비밀번호는(" + result.rows.item(i).password1 + ")입니다.");
                        window.close();
                        return;
                    } else {
                        alert('두 정보가 일치하지 않습니다.');
                    }
                }
            } if (i + 1 == len){
                alert("아이디를 찾지 못했습니다.");
            }
        });
    });
}

function find_with_birth() {
    var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);
    var birth = document.getElementsByClassName("write")[4].value;
    var id = document.getElementsByClassName("write")[5].value;
    db.transaction(function (tx) {
        tx.executeSql("select * from list", [], function (tx, result) {

            var len = result.rows.length, i;

            for (i = 0; i < len; i++) {
                if (result.rows.item(i).id == id) {
                    if (result.rows.item(i).birth == birth) {
                        alert("비밀번호는(" + result.rows.item(i).password1 + ")입니다.");
                        window.close();
                        return;
                    } else {
                        alert('일치하지 않습니다.');
                    }
                }
            } if(i + 1 == len){
                alert("존재하지 않는 아이디입니다.");
            }
        });
    });
}