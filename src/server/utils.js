//获取用户信息
const loginUser = () => {
    return getCookie('current-user');
}

//判断是否登录
const isLogin = () => {
    const user = loginUser();
    return user === 'object';
}

//设置cookie
const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    // if(/[\u4e00-\u9fa5]/ig.test(cvalue)){
        
    // }
    cvalue = encodeURIComponent(cvalue);
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
const getCookie = cname => {
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim().split("=");
        if (c[0] == cname) {
            let value = c[1];
            if(value.includes("%")){
                value = decodeURIComponent(value);
            }
            return value;
        }
    }
    return "";
}


//删除一个cookie
const delCookie = name => {                   
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toUTCString();
}

//存储localStorage
const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

//获取localStorage
const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}


const checkAccount = (rule, value, callback)=>{
    //正则用//包起来
    var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/; 
    if (value) {
      //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
      if (regex.test(value)) { 
        callback();
      } else { 
        callback('请输入正确的手机号码！');
      }
    } else {
      //这里的callback函数会报错
    }
}

// 将时间戳转换为日期格式
const timestampToTime = (date,showtime) => {
    //var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ":";
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ":";
    var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    if(showtime){
        return Y+M+D+' '+h+m+s;
    }else{
        return Y+M+D;
    }
}

export {
    isLogin,
    loginUser,
    setCookie,
    getCookie,
    delCookie,
    setStore,
    getStore,
    checkAccount,
    timestampToTime
}