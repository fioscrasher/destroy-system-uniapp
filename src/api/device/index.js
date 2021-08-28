import request from "@/router/axios";

export const uploadPosition = data => {
	return request({
		url: "/location/add",
		method: "post",
		data
	});
};
