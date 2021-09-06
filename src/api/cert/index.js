import request from "@/router/axios";

export const getList = (current, size, params) => {
	return request({
		url: "/certificate/page",
		method: "get",
		params: {
			...params,
			current,
			size
		}
	});
};

export const update = data => {
	return request({
		url: "/certificate/update",
		method: "post",
		data
	});
};
