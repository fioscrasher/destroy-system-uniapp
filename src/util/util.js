import { validatenull } from "./validate";
//表单序列化
export const serialize = data => {
	let list = [];
	Object.keys(data).forEach(ele => {
		list.push(`${ele}=${data[ele]}`);
	});
	return list.join("&");
};
export const getObjType = obj => {
	var toString = Object.prototype.toString;
	var map = {
		"[object Boolean]": "boolean",
		"[object Number]": "number",
		"[object String]": "string",
		"[object Function]": "function",
		"[object Array]": "array",
		"[object Date]": "date",
		"[object RegExp]": "regExp",
		"[object Undefined]": "undefined",
		"[object Null]": "null",
		"[object Object]": "object"
	};
	if (obj instanceof Element) {
		return "element";
	}
	return map[toString.call(obj)];
};
export const getViewDom = () => {
	return window.document
		.getElementById("avue-view")
		.getElementsByClassName("el-scrollbar__wrap")[0];
};
/**
 * 对象深拷贝
 */
export const deepClone = data => {
	var type = getObjType(data);
	var obj;
	if (type === "array") {
		obj = [];
	} else if (type === "object") {
		obj = {};
	} else {
		//不再具有下一层次
		return data;
	}
	if (type === "array") {
		for (var i = 0, len = data.length; i < len; i++) {
			obj.push(deepClone(data[i]));
		}
	} else if (type === "object") {
		for (var key in data) {
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
};
