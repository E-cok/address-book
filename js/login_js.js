function login_check() {
	var id = document.getElementsByClassName("write")[0].value;
	var password = document.getElementsByClassName("write")[1].value;

	if (id.value == "") {
		$('#ID').effect("shake", { times: 5, distance: 500 }, 700);
		id.focus();
		return false;
	} if (password.value == "") {
		alert("패스워드가 입력되지 않았습니다.");
		$('#PASSWORD').effect("shake", { times: 5, distance: 500 }, 700);
		password.focus();
		return false;
	} if (id.value == "" && password.value == "") {
		$('#ID').effect("shake", { times: 5, distance: 500 }, 700);
		$('#PASSWORD').effect("shake", { times: 5, distance: 500 }, 700);
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
						location.href = "main.html"
						window.localStorage.setItem("id", id);
						return;
					} else {
						$('#PASSWORD').effect("shake", { times: 5, distance: 500 }, 700);
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