import axios from "axios-miniprogram";
import store from "@/store/";
import { Base64 } from "js-base64";
import { getToken } from "@/util/auth";
import { serialize } from "@/util/util";

// #ifdef APP-PLUS
axios.defaults.baseURL = "http://114.96.76.108:8082/api";
// #endif
// #ifndef APP-PLUS
axios.defaults.baseURL = "/api";
// #endif

//默认超时时间
axios.defaults.timeout = 10000;
//返回其他状态码
axios.defaults.validateStatus = function(status) {
	return status >= 200 && status <= 500;
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

//http request拦截
axios.interceptors.request.use(
	config => {
		const meta = config.meta || {};
		const isToken = meta.isToken === false;
		config.headers["Authorization"] = `Basic ${Base64.encode(
			`saber:saber_secret`
		)}`;
		//让每个请求携带token
		if (getToken() && !isToken) {
			config.headers["Blade-Auth"] = "bearer " + getToken();
		}
		//headers中配置text请求
		if (config.text === true) {
			config.headers["Content-Type"] = "text/plain";
		}
		//headers中配置serialize为true开启序列化
		if (config.method === "post") {
			if (meta.isSerialize === true) {
				config.data = serialize(config.data);
			}
			if (!config.headers["Content-Type"]) {
				config.headers["Content-Type"] = "application/json";
			}
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

//http response 拦截
axios.interceptors.response.use(
	res => {
		//获取状态码
		const status = res.data.error_code || res.data.code || res.status;
		const statusWhiteList = [];
		const message = res.data.msg || res.data.error_description || "未知错误";
		//如果在白名单里则自行catch逻辑处理
		if (statusWhiteList.includes(status)) return Promise.reject(res);
		//如果是401则跳转到登录页面
		if (status === 401)
			store.dispatch("FedLogOut").then(() => {
				uni.reLaunch({
					url: "/pages/login/login"
				});
			});
		// 如果请求为非200否者默认统一处理
		if (status !== 200) {
			uni.showToast({
				title: message,
				icon: "error",
				duration: 2000
			});
			return Promise.reject(new Error(message));
		}
		return res;
	},
	error => {
		return Promise.reject(new Error(error));
	}
);

export default axios;
