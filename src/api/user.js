import request from "@/router/axios";

export const loginByUsername = (
	tenantId,
	username,
	password,
	type,
	key,
	code
) =>
	request({
		url: "/blade-auth/oauth/token",
		method: "post",
		headers: {
			"Tenant-Id": tenantId,
			"Captcha-Key": key,
			"Captcha-Code": code
		},
		params: {
			tenantId,
			username,
			password,
			grant_type: "captcha",
			scope: "all",
			type
		}
	});

export const getCaptcha = () =>
	request({
		url: "/blade-auth/oauth/captcha",
		method: "get"
	});
