import axios from 'axios';
import { delCookie, getCookie } from '@/server/utils.js';
// paramType 参数类型1.query,2.body
export default async (url, data, type, key, isheader = false, paramType) => {

	url = 'https://localhost:8080' + url;
	if (type == 'GET' || paramType === 'query') {
		let dataStr = ''; //数据拼接字符串
		if(JSON.stringify(data) !== "{}"){ 
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
			})
		}
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	let instance;
	if(isheader){
	    instance = axios.create({
			baseURL: "",
			timeout: 25000,
			method: type,
			headers:{
				'token':getCookie('token')
			}
			
		});
	}else{
		instance = axios.create({
			baseURL: "",
			timeout: 25000,
			method: type
		});
		
	}

	
	const response = await instance.request({
		url: url,
		data: data
	}).catch((err) => {
		console.log(err)
	})

	const responseObj = await response;
	const responsJson = responseObj?responseObj.data:{};
	// if(responsJson.msg === '该用户登陆已失效，请重新登陆'){
	// 	delCookie('current-user');
 //        delCookie('token');
 //        delCookie('orgId');
 //        delCookie('shopId');
 //        delCookie('orgName');
 //        delCookie('tentantId');
 //        delCookie('userName');
 //        delCookie('userNickName');
 //        delCookie('id');
 //        delCookie('enterpriseCertificationId');
 //        delCookie('enterpriseCertificationstatusCode');
 //        delCookie('enterpriseCertificationstatusName');
 //        dispatch.login.TOGGLE_LOGINSTATUS();
 //        dispatch.global.RESET_USERMESSAGE();
 //        dispatch.fixedNav.shoppingCarAllNumber();
	// 	return;
	// }
	return responsJson;
}