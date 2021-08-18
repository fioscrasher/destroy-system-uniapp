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
			grant_type: "password",
			scope: "all",
			type
		}
	});

export const logout = () =>
	request({
		url: "/blade-auth/oauth/logout",
		method: "get"
	});

export const getCaptcha = () =>
	request({
		url: "/blade-auth/oauth/captcha",
		method: "get"
	});

export const getUserInfo = () =>
	request({
		url: "/blade-auth/oauth/user-info",
		method: "get"
	});

export const refreshToken = (refresh_token, tenantId) =>
	request({
		url: "/blade-auth/oauth/token",
		method: "post",
		headers: {
			"Tenant-Id": tenantId
		},
		params: {
			tenantId,
			refresh_token,
			grant_type: "refresh_token",
			scope: "all"
		}
	});
