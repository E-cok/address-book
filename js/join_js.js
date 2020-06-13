function joinvalue(){
	var id = document.getElementById("id");
	var password1 = document.getElementById("password1");
	var password2 = document.getElementById("password2");
	var name = document.getElementById("name");
	var tel = document.getElementById("tel");
	var birth = document.getElementById("birth");

	if(id.value == ""){
		alert("아이디를 입력하세요.");
		id.focus();
		return false;
	}else if(password1.value == ""){
		alert("패스워드를 입력하세요.");
		password1.focus();
		return false;
	}else if(password2.value == ""){
		alert("패스워드를 다시 한번 입력하세요.");
		password2.focus();
		return false;
	}else if(name.value == ""){
		alert("이름을 입력하세요.");
		name.focus();
		return false;
	}else if(tel.value == ""){
		alert("핸드폰 번호를 입력하세요.");
		tel.focus();
		return false;
	}else if(birth.value == ""){
		alert("생년월일을 입력하세요. (년/월/일)");
		birth.focus();
		return false;
	}else if(birth.value.length > 8 || birth.value.length < 8){
		alert("생년월일은 8자리 수로 입력되어야 합니다.");
		birth.focus();
		return false;
	}else if(password1.value != password2.value){
		alert("패스워드가 다릅니다. \n다시 확인하세요.");
		password1.focus();
		return false;
	}else{
		alert("회원가입 되었습니다.");
		location.replace("main.html")
	}
}