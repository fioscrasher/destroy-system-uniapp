import request from "@/router/axios";

export const uploadPosition = data => {
	return request({
		url: "/location/add",
		method: "post",
		data
	});
};

export const getPosition = (current, size, params) => {
	return request({
		url: "/location/page",
		method: "get",
		params: {
			...params,
			current,
			size
		}
	});
};
