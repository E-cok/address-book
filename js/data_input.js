function data_input() {
    var id = window.localStorage.getItem("id");
    var name = document.getElementsByClassName("write")[0].value;
    var call = document.getElementsByClassName("write")[1].value;
    var job = document.getElementsByClassName("write")[2].value;
    var email = document.getElementsByClassName("write")[3].value;
    var memo = document.getElementsByClassName("write")[4].value;

    var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);

    db.transaction(function (tx) {

        tx.executeSql("select * from listdata", [], function (tx, result) {
            for (var i = 0; i < result.rows.length; i++) {
                if (result.rows.item(i).call == call) {
                    alert("이미 존재하는 전화번호입니다.");
                    break;
                }
                if (i + 1 == result.rows.length) {
                    input();
                    self.close();
                    return;
                }
            }
        });
        function input() {

            var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);

            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS listdata (id, name, call, job, email, memo)');
                tx.executeSql('INSERT INTO listdata (id, name, call, job, email, memo) VALUES(?, ?, ?, ?, ?, ?)', [id, name, call, job, email, memo]);
                alert("등록되었습니다.");
            });
        }
    });
}