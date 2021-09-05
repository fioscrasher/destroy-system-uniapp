import request from "@/router/axios";
import Qs from "qs";

export const getList = (current, size, params) => {
	return request({
		url: "/order/page",
		method: "get",
		params: {
			...params,
			current,
			size
		}
	});
};

export const getHandlers = () => {
	return request({
		url: "/blade-user/getHandlers",
		method: "get"
	});
};

export const getPlates = () => {
	return request({
		url: "/vehicle/getList",
		method: "get"
	});
};

export const getDrivers = () => {
	return request({
		url: "/blade-user/getDrivers",
		method: "get"
	});
};

export const getPorters = () => {
	return request({
		url: "/blade-user/getPorters",
		method: "get"
	});
};

export const sendOrder = data => {
	return request({
		url: "/order/dispatchOrder",
		method: "post",
		data: Qs.stringify(data),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
