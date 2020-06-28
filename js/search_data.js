// function data_list() {
//     //데이터베이스에서 데이터를 가져오는 스크립트입니다.
//     var db = openDatabase('table', '1.0', 'Test', 6 * 1024 * 1024);
//     var data_list;

//     db.transaction(function (tx) {
//         //기본적으로 tx에 select *을 통해 모든 데이터를 가져오기 위한 밑작업입니다.
//         tx.executeSql('SELECT * FROM log', [], function (_tx, result) {
//             var len = result.rows.length, i;

//             for (i = 0; i < len; i++) {
//                 data_list[0][i] = result.rows.item(i).id;
//                 data_list[1][i] = result.rows.item(i).name;
//                 data_list[2][i] = result.rows.item(i).job;
//                 data_list[3][i] = result.rows.item(i).email;
//                 data_list[4][i] = result.rows.item(i).call;
//                 data_list[5][i] = result.rows.item(i).memo;
//             }
//             return data_list;
//         }, null);
//     });
// }