const TokenKey = "saber-access-token";
const RefreshTokenKey = "saber-refresh-token";
export function getToken() {
	return uni.getStorageSync(TokenKey);
}

export function setToken(token) {
	return uni.setStorageSync(TokenKey, token);
}

export function getRefreshToken() {
	return uni.getStorageSync(RefreshTokenKey);
}

export function setRefreshToken(token) {
	return uni.setStorageSync(RefreshTokenKey, token);
}

export function removeToken() {
	return uni.removeStorageSync(TokenKey);
}

export function removeRefreshToken() {
	return uni.removeStorageSync(RefreshTokenKey);
}
