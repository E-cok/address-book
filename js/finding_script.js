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
                }else if (len == i+1){
                    alert("존재하지 않는 이름입니다.");
                }
            }
        });
    });
}

function find_with_call() {
    var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);
    var call = document.getElementsByClassName("write")[0].value;
    var id = document.getElementsByClassName("write")[1].value;
    db.transaction(function (tx) {
        tx.executeSql("select * from list", [], function (tx, result) {

            var len = result.rows.length, i;

            for (i = 0; i < len; i++) {
                if (result.rows.item(i).call == call) {
                    if (result.rows.item(i).id == id) {
                        alert("비밀번호는(" + result.rows.item(i).password1 + ")입니다.");
                        window.close();
                        return;
                    } else {
                        alert('일치하지 않습니다.');
                        window.close();
                        return;
                    }
                }else if (len == i+1){
                    alert("존재하지 않는 이름입니다.");
                }
            }
        });
    });
}

function find_with_birth() {
    var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);
    var birth = document.getElementsByClassName("write")[0].value;
    var id = document.getElementsByClassName("write")[1].value;
    db.transaction(function (tx) {
        tx.executeSql("select * from list", [], function (tx, result) {

            var len = result.rows.length, i;

            for (i = 0; i < len; i++) {
                if (result.rows.item(i).birth == birth) {
                    if (result.rows.item(i).id == id) {
                        alert("비밀번호는(" + result.rows.item(i).password1 + ")입니다.");
                        window.close();
                        return;
                    } else {
                        alert('일치하지 않습니다.');
                        window.close();
                        return;
                    }
                }else if (len == i+1){
                    alert("존재하지 않는 이름입니다.");
                }
            }
        });
    });
}