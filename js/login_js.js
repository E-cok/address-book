function login_check() {
	var id = document.getElementsByClassName("write")[0].value;
	var password = document.getElementsByClassName("write")[1].value;

	if (id.value == "") {
		alert('존재하지 않는 계정입니다.');
		id.focus();
		return false;
	} if (password.value == "") {
		alert("패스워드가 입력되지 않았습니다.");
		password.focus();
		return false;
	} if (id.value != "" && password.value != "") {
		login(id, password);
	}
}

function login(id, password) {
	var db = openDatabase('account1', '1.0', 'test', 2 * 1024 * 1024);

	db.transaction(function (tx) {
		tx.executeSql("select * from list", [], function (tx, result) {

			var len = result.rows.length, i;

			for (i = 0; i < len; i++) {
				if (result.rows.item(i).id == id) {
					if (result.rows.item(i).password1 == password) {
						alert('로그인 되었습니다.');
						location.href = "main.html"
						window.localStorage.setItem("id", id);
						return;
					} else {
						alert('패스워드를 다시 확인해주세요.');
						return;
					}
				} if (i + 1 == len) {
					$('#ID').effect("shake", { times: 5, distance: 500 }, 700);
					return;
				}
			}
		});
	});

}