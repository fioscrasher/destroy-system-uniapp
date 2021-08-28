import {
	setToken,
	setRefreshToken,
	removeToken,
	removeRefreshToken
} from "@/util/auth";
import { setStore, getStore } from "@/util/store";
import { isURL, validatenull } from "@/util/validate";
import { loginByUsername, getUserInfo, refreshToken, logout } from "@/api/user";
import md5 from "js-md5";

const user = {
	state: {
		tenantId: getStore({ name: "tenantId" }) || "",
		userInfo: getStore({ name: "userInfo" }) || [],
		permission: getStore({ name: "permission" }) || {},
		token: getStore({ name: "token" }) || "",
		refreshToken: getStore({ name: "refreshToken" }) || ""
	},
	actions: {
		//根据用户名登录
		LoginByUsername({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
				loginByUsername(
					userInfo.tenantId,
					userInfo.username,
					md5(userInfo.password),
					userInfo.type,
					userInfo.key,
					userInfo.code
				)
					.then(res => {
						const data = res.data;
						if (data.error_description) {
							uni.showToast({
								title: data.error_description,
								icon: "error",
								duration: 2000
							});
						} else {
							commit("SET_TOKEN", data.access_token);
							commit("SET_REFRESH_TOKEN", data.refresh_token);
							commit("SET_TENANT_ID", data.tenant_id);
							commit("SET_USER_INFO", data);
						}
						resolve();
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		//获取用户信息
		GetUserInfo({ commit }) {
			return new Promise((resolve, reject) => {
				getUserInfo()
					.then(res => {
						const data = res.data.data;
						commit("SET_ROLES", data.roles);
						resolve(data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		//刷新token
		refreshToken({ state, commit }) {
			window.console.log("handle refresh token");
			return new Promise((resolve, reject) => {
				refreshToken(state.refreshToken, state.tenantId)
					.then(res => {
						const data = res.data;
						commit("SET_TOKEN", data.access_token);
						commit("SET_REFRESH_TOKEN", data.refresh_token);
						resolve();
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		// 登出
		LogOut({ commit }) {
			return new Promise((resolve, reject) => {
				logout()
					.then(() => {
						commit("SET_TOKEN", "");
						commit("SET_ROLES", []);
						removeToken();
						removeRefreshToken();
						resolve();
					})
					.catch(error => {
						reject(error);
					});
			});
		},
    //注销session
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        removeRefreshToken();
        resolve();
      });
    },
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			setToken(token);
			state.token = token;
			setStore({ name: "token", content: state.token });
		},
		SET_REFRESH_TOKEN: (state, refreshToken) => {
			setRefreshToken(refreshToken);
			state.refreshToken = refreshToken;
			setStore({ name: "refreshToken", content: state.refreshToken });
		},
		SET_TENANT_ID: (state, tenantId) => {
			state.tenantId = tenantId;
			setStore({ name: "tenantId", content: state.tenantId });
		},
		SET_USER_INFO: (state, userInfo) => {
			if (validatenull(userInfo.avatar)) {
				userInfo.avatar = "/static/image/user_default.png";
			}
			state.userInfo = userInfo;
			setStore({ name: "userInfo", content: state.userInfo });
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles;
		}
	}
};

export default user;
