function joinvalue() {
	var id = document.getElementsByClassName("write")[0].value;
	var password1 = document.getElementsByClassName("write")[1].value;
	var password2 = document.getElementsByClassName("write")[2].value;
	var name = document.getElementsByClassName("write")[3].value;
	var tel = document.getElementsByClassName("write")[4].value;
	var birth = document.getElementsByClassName("write")[5].value;

	if (id == "") {
		alert("아이디를 입력하세요.");
		id.focus();
		return false;
	} else if (password1 == "") {
		alert("패스워드를 입력하세요.");
		password1.focus();
		return false;
	} else if (password2 == "") {
		alert("패스워드를 다시 한번 입력하세요.");
		password2.focus();
		return false;
	} else if (name == "") {
		alert("이름을 입력하세요.");
		name.focus();
		return false;
	} else if (tel == "") {
		alert("핸드폰 번호를 입력하세요.");
		tel.focus();
		return false;
	} else if (birth == "") {
		alert("생년월일을 입력하세요. (년/월/일)");
		birth.focus();
		return false;
	} else if (birth.length > 8 || birth.length < 8) {
		alert("생년월일은 8자리 수로 입력되어야 합니다.");
		birth.focus();
		return false;
	} else if (password1 != password2) {
		alert("패스워드가 다릅니다. \n다시 확인하세요.");
		password1.focus();
		return false;
	} else {
		Duplicate_check(id, password1, name, tel, birth);
	}
}

function Duplicate_check(id, password1, name, tel, birth) {
	
	var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);
	//데이터베이스를 생성합니다.
	db.transaction(function (tx) {
		//테이블을 생성합니다.
		tx.executeSql('CREATE TABLE IF NOT EXISTS list (id, password1, name, tel, birth, memo)');
		//테이블의 모든 값을 result에 리스트로 불러옵니다.
		tx.executeSql("select * from list", [], function (tx, result) {
			alert(result.rows.length);
			if (result.rows.length == 0) {
				input(id, password1, name, tel, birth);
				return true;
			} else {
				for (var i = 0; i < result.rows.length; i++) {
					if (result.rows.item(i).id == id) {
						alert('아이디가 존재합니다.');
						return false;
					} if (i + 1 == result.rows.length) {
						input(id, password1, name, tel, birth);
						return true;
					}
				}
			}

		});
	});
}

function input(id, password1, name, tel, birth) {

	var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO list (id, password1, name, tel, birth, memo) VALUES(?, ?, ?, ?, ?, ?)', [id, password1, name, tel, birth, "memo"]);
		alert("회원가입 되었습니다.");
		window.localStorage.setItem("id", id);
		location.replace("main.html");
	});
}


function search() {
	var id = document.getElementsByClassName("write")[0].value;
	var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);

	db.transaction(function (tx) {
		tx.executeSql("select * from list", [], function (tx, result) {

			var len = result.rows.length, i;

			for (i = 0; i < len; i++) {
				if (result.rows.item(i).id == id) {
					document.getElementsByClassName("write")[0].value = "";
					alert("아이디가 이미 존재합니다.");
					return;
				}
			}
			return;
		});
	});
}