function reload() {

	var table = document.getElementById("data_table");

	$('#data_table').empty();

	var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);

	db.transaction(function (tx) {
		tx.executeSql("select * from listdata", [], function (tx, result) {
			var len = result.rows.length, i;

			for (i = 0; i < len; i++) {
				var row = table.insertRow(table.rows.length);

				row.insertCell(0).innerHTML = result.rows.item(i).name;
				row.insertCell(1).innerHTML = result.rows.item(i).call;
				row.insertCell(2).innerHTML = result.rows.item(i).job;
				row.insertCell(3).innerHTML = result.rows.item(i).email;
				row.insertCell(4).innerHTML = result.rows.item(i).memo;
			}
		});
	});
}

function only_my_acc() {

	var table = document.getElementById("data_table");

	$('#data_table').empty();

	var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);

	db.transaction(function (tx) {
		tx.executeSql("select * from listdata", [], function (tx, result) {
			var len = result.rows.length, i;

			for (i = 0; i < len; i++) {
				var row = table.insertRow(table.rows.length);
				if (result.rows.item(i).id == window.localStorage.getItem("id")) {
					row.insertCell(0).innerHTML = result.rows.item(i).name;
					row.insertCell(1).innerHTML = result.rows.item(i).call;
					row.insertCell(2).innerHTML = result.rows.item(i).job;
					row.insertCell(3).innerHTML = result.rows.item(i).email;
					row.insertCell(4).innerHTML = result.rows.item(i).memo;
				}

			}
		});
	});
}


function search() {
	var table = document.getElementById("data_table");

	$('#data_table').empty();

	var db = openDatabase('listtable', '1.0', 'data_list', 2 * 1024 * 1024);

	db.transaction(function (tx) {
		tx.executeSql("select * from listdata", [], function (tx, result) {
			var len = result.rows.length, i;

			if (document.getElementById("searching").value == "") {
				alert("값을 입력해주세요");
				reload();
			} else {
				for (i = 0; i < len; i++) {
					if (result.rows.item(i).call == document.getElementById("searching").value) {
						var row = table.insertRow(table.rows.length);
						row.insertCell(0).innerHTML = result.rows.item(i).name;
						row.insertCell(1).innerHTML = result.rows.item(i).call;
						row.insertCell(2).innerHTML = result.rows.item(i).job;
						row.insertCell(3).innerHTML = result.rows.item(i).email;
						row.insertCell(4).innerHTML = result.rows.item(i).memo;
					}
				}
			}


		});
	});
}