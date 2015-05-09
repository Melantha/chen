window.onload = function () {
	var re = /[^\w\u4e00-\u9fa5]/g;
	// 正则表达匹配所有非法字符，含有字母(不区分大小写)，数字，汉字，下划线；

	var ainput = document.getElementsByTagName('input');
	var oName = ainput[0];
	var oPwd = ainput[1];
	var oPwd2 = ainput[2];
	var ap = document.getElementsByTagName('p');
	var name_msg = ap[0];
	var pwd_msg = ap[1];
	var pwd2_msg = ap[2];
	var oCount = document.getElementById('count');
	var aLi = document.getElementsByTagName('li');
	var oSubmit = document.getElementById('submit');
	var oname_length = 0;

	function nameLength(str) {
		return str.replace( /[^\x00-xff]/g,"xx").length;
		// 正则统计字数(中文占两个字节);
	}
	function pwdLength(str) {
		return str.replace( /[^\x00-xff]/g).length;
	}
	oName.onfocus =function() {
		name_msg.innerHTML = '6-25个字符，一个汉字为两个字符，推荐使用中文会员名';
	}
	oName.onkeyup = function() {
		oCount.style.visibility = "visible";
		oname_length = nameLength(this.value);
		oCount.innerHTML = oname_length + "个字符" ;
		if (oname_length == 0) {
			oCount.visibility = "hidden";
		};
	}
	oName.onblur = function() {
		if ( re.test(this.value)) {
			name_msg.innerHTML = '含有非法字符,只允许出现字母，数字，汉字，下划线';
		} else if ( this.value == "" ) {
			name_msg.innerHTML = '不能为空！';
		} else if (nameLength(this.value) < 6 ) {
			name_msg.innerHTML = '请重新填写,少于6个字符！';
		} else if (nameLength(this.value) > 25 ) {
			name_msg.innerHTML = '请重新填写,大于25个字符！';
		} 
		else {
			name_msg.innerHTML = 'OK';
		}
	}

	oPwd.onfocus = function() {
		pwd_msg.innerHTML = '请输入你的密码！';	
	}
	oPwd.onkeyup = function() {
		pwd_length = pwdLength(this.value);
		if ( pwd_length > 5) {
			aLi[1].className = "active";
			oPwd2.removeAttribute("disabled");
			pwd2_msg.innerHTML = '请再输入一次！';
		} else {
			aLi[1].className = "" ; 
			oPwd2.setAttribute("disabled","disabled");
		}
		if ( pwd_length > 10 ) {
			aLi[2].className = "active";
		} else {
			aLi[2].className = "" ; 
		}
	}
	oPwd.onblur = function() {
		pwd_length = pwdLength(this.value);
		if (re.test(this.value)) {
			pwd_msg.innerHTML = '非法字符！';
		} else if (this.value == "" ) {
			pwd_msg.innerHTML = '密码不能为空！';
		} else if ( pwd_length < 6 ) {
			pwd_msg.innerHTML = '字符不能少于6个！';
		} else if ( pwd_length > 16 ) {
			pwd_msg.innerHTML = '字符不能多于16个！'
		} else {
			pwd_msg.innerHTML = 'OK!';
		}
	}

	oPwd2.onfocus = function() {
		pwd2_msg.innerHTML = "";
	}
	oPwd2.onblur = function() {
		if ( this.value != oPwd.value ) {
			pwd2_msg.innerHTML = '两次密码不一致！';
		} else {
			pwd2_msg.innerHTML = 'OK！';
		}
	}
}
