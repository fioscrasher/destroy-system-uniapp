import request from "@/router/axios";
import Qs from "qs";

export const getList = (current, size, params) => {
	return request({
		url: "/package/page",
		method: "get",
		params: {
			...params,
			current,
			size
		}
	});
};

export const add = row => {
	return request({
		url: "/package/generateQrCode",
		method: "post",
		data: Qs.stringify(row),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

export const remove = id => {
	return request({
		url: "/package/remove",
		method: "post",
		data: Qs.stringify({ id }),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
