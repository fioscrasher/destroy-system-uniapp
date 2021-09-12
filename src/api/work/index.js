import request from "@/router/axios";
import uploader from "@/router/upload";

export const getList = (current, size, params) => {
	return request({
		url: "/work/page",
		method: "get",
		params: {
			...params,
			current,
			size
		}
	});
};

export const followDetail = params => {
	return request({
		url: "/work/followDetail",
		method: "get",
		params
	});
};

export const followSubmit = data => {
	return request({
		url: "/work/submit",
		method: "post",
		data
	});
};

export const upload = data => {
	return uploader("/blade-resource/oss/endpoint/put-file", data);
};

export const uploadVideo = (file, data) => {
	return uploader("/blade-resource/oss/endpoint/uploadVideo", file, data);
};

export const destroyUserList = params => {
	return request({
		url: "/blade-user/getDestroyUsers",
		method: "get",
		params
	});
};
