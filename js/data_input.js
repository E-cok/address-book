function data_input() {
    alert("진입성공")
    var id = window.localStorage.getItem("id");
    var name = document.getElementsByClassName("write")[0].value;
    var call = document.getElementsByClassName("write")[1].value;
    var job = document.getElementsByClassName("write")[2].value;
    var email = document.getElementsByClassName("write")[3].value;
    var memo = document.getElementsByClassName("write")[4].value;
    alert(id)
    alert(name)
    alert(call)
    alert(job)
    alert(email)

    var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);
    alert("db오픈")
    db.transaction(function (tx) {
        alert("db접속")
        tx.executeSql('CREATE TABLE IF NOT EXISTS listdata (id, name, call, job, email, memo)');
        tx.executeSql("select * from listdata", [], function (tx, result) {
            alert(result.rows.length);
            if (result.rows.length == 0) {
                var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);

                db.transaction(function (tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS listdata (id, name, call, job, email, memo)');
                    tx.executeSql('INSERT INTO listdata (id, name, call, job, email, memo) VALUES(?, ?, ?, ?, ?, ?)', [id, name, call, job, email, memo]);
                    alert("등록되었습니다.");
                    self.close();
                });

            } else {
                for (var i = 0; i < result.rows.length; i++) {
                    if (result.rows.item(i).call == call) {
                        alert("이미 존재하는 전화번호입니다.");
                        break;
                    }

                    if (i + 1 == result.rows.length) {
                        var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);

                        db.transaction(function (tx) {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS listdata (id, name, call, job, email, memo)');
                            tx.executeSql('INSERT INTO listdata (id, name, call, job, email, memo) VALUES(?, ?, ?, ?, ?, ?)', [id, name, call, job, email, memo]);
                            alert("등록되었습니다.");
                            self.close();
                        });
                        return;
                    }
                }
            }

        });

    });
}