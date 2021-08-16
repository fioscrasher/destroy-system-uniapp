import { validatenull } from "@/util/validate";
const keyName = 'saber-';

/**
 * 存储localStorage
 */
export const setStore = (params = {}) => {
	let { name, content, type } = params;
	name = keyName + name;
	let obj = {
		dataType: typeof content,
		content: content,
		type: type,
		datetime: new Date().getTime()
	};
	uni.setStorageSync(name, JSON.stringify(obj));
};

/**
 * 获取localStorage
 */
export const getStore = (params = {}) => {
	let { name, debug } = params;
	name = keyName + name;
	let obj = {},
		content;
	obj = uni.getStorageSync(name);
	if (validatenull(obj)) return;
	try {
		obj = JSON.parse(obj);
	} catch {
		return obj;
	}
	if (debug) {
		return obj;
	}
	if (obj.dataType == "string") {
		content = obj.content;
	} else if (obj.dataType == "number") {
		content = Number(obj.content);
	} else if (obj.dataType == "boolean") {
		content = eval(obj.content);
	} else if (obj.dataType == "object") {
		content = obj.content;
	}
	return content;
};

/**
 * 删除localStorage
 */
export const removeStore = (params = {}) => {
	let { name } = params;
	name = keyName + name;
	uni.removeStorageSync(name);
};

/**
 * 获取全部localStorage
 */
export const getAllStore = () => {
	let list = [];
	let info = uni.getStorageInfoSync();
	for (let i = 0; i <= info.keys.length; i++) {
		list.push({
			name: info.keys[i],
			content: getStore({
				name: info.keys[i]
			})
		});
	}
	return list;
};

/**
 * 清空全部localStorage
 */
export const clearStore = () => {
	uni.clearStorageSync();
};
