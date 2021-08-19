import request from "@/router/axios";

export const getList = (current, size, params) => {
	return request({
		url: "/audit/page",
		method: "get",
		params: {
			...params,
			current,
			size
		}
	});
};

export const approveSubmit = data => {
  return request({
    url: "/audit/toAudit",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
