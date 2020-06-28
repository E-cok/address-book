function data_delete() {
    var name = window.localStorage.getItem("name");
    var call = window.localStorage.getItem("call");

    var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);
    //데이터베이스를 생성합니다.
    db.transaction(function (tx) {
        //테이블의 모든 값을 result에 리스트로 불러옵니다.
        tx.executeSql("select * from listdata", [], function (tx, result) {
            //리스트를 전부 읽어서 값이 존재하는지 확인합니다.     

            for (var i = 0; i < result.rows.length; i++) {
                if (result.rows.item(i).call == call) {
                    if (result.rows.item(i).name == name) {
                        if (result.rows.item(i).id == window.localStorage.getItem("id")) {
                            delete_(name);
                        } else {
                            alert("권한이 없습니다.");
                            self.close();
                            return;
                        }
                    } else {
                        alert("이름이 다릅니다.");
                        self.close();
                        return;
                    }
                }
            } if (i + 1 == result.rows.length) {
                alert("존재하지 않는 전화번호입니다.");
                self.close();
                return;
            }
        });
    });
}

function delete_(name) {
    //테이블에서 바로 삭제합니다.
    var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM listdata WHERE name=?', [name]);
        alert("삭제를 성공했습니다.");
        self.close();
    });
}