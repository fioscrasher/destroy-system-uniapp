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

export const getUsers = params => {
	return request({
		url: "/blade-user/getInternalPersons",
		method: "get",
		params
	});
};

export const getLocation = params => {
	return request({
		url: "/location/getLatestLocationByUserId",
		method: "get",
		params
	});
};
