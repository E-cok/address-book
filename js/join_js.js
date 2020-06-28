function joinvalue() {
	var id = document.getElementsByClassName("write")[0].value;
	var password1 = document.getElementsByClassName("write")[1].value;
	var password2 = document.getElementsByClassName("write")[2].value;
	var name = document.getElementsByClassName("write")[3].value;
	var tel = document.getElementsByClassName("write")[4].value;
	var birth = document.getElementsByClassName("write")[5].value;

	if (id != "") {
		var regId = /^[a-zA-Z]{1}[a-zA-Z0-9_-]{4,19}$/;
		if(!regId.test(id)){
			alert("아이디는 영문,숫자 조합 최소 4자리에서 19자리입니다.");
			id.focus();
			return false;
		}
	}else{
		alert("아이디가 입력되지 않았습니다.");
		id.focus();
		return false;
	}

	if (password1 == "") {
		alert("패스워드를 입력하세요.");
		password1.focus();
		return false;
	} else if (password2 == "") {
		alert("패스워드를 다시 한번 입력하세요.");
		password2.focus();
		return false;
	}else if (password1 != password2) {
		alert("패스워드가 다릅니다. \n다시 확인하세요.");
		password1.focus();
		return false;
	}
	
	if (name != "") {
		var regHangulOnly = /^[가-힣]*$/;
		if(!regHangulOnly.test(name)){
			alert("이름은 한글로만 작성되어야 합니다.");
			name.focus();
			return false;
		}
	}else{
		alert("이름이 입력되지 않았습니다.");
		name.focus();
		return false;
	}

	if (tel != "") {
		var regPhone = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
		if(!regPhone.test(tel)){
			alert("핸드폰 번호의 형식이 알맞지 않습니다.");
			tel.focus();
			return false;
		}
	}else{
		alert("핸드폰 번호가 입력되지 않았습니다.");
		tel.focus();
		return false;
	}

	if (birth != "") {
		var regBirth = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
		if(!regBirth.test(birth)){
			alert("생년월일은 8자리이여야 합니다.");
			birth.focus();
			return false;
		}
	}else{
		alert("생년월일이 입력되지 않았습니다.");
		birth.focus();
		return false;
	}
	Duplicate_check(id, password1, name, tel, birth);
}

function Duplicate_check(id, password1, name, tel, birth) {
	
	var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);
	//데이터베이스를 생성합니다.
	db.transaction(function (tx) {
		//테이블을 생성합니다.
		tx.executeSql('CREATE TABLE IF NOT EXISTS list (id, password1, name, tel, birth, memo)');
		//테이블의 모든 값을 result에 리스트로 불러옵니다.
		tx.executeSql("select * from list", [], function (tx, result) {
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

function auto_add_dash() {
    $(document).on("keyup", "#tel", function() { $(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") ); });
}

function auto_del_dash() {
	$(document).on("keyup", "#birth", function() { $(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,"$1-$2-$3").replace("-", "").replace("-", "") ); });
}