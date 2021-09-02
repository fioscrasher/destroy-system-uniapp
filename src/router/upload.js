import { baseUrl } from "@/config/env";
import { getToken } from "@/util/auth";
import { Base64 } from "js-base64";

const upload = (url, filePath, formData = {}, name = "file") => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl + url,
			filePath,
			name: "file",
			formData,
      timeout: 300000,
			header: {
				Authorization: `Basic ${Base64.encode(`saber:saber_secret`)}`,
				"Blade-Auth": "bearer " + getToken()
			},
			success: uploadFileRes => {
				resolve(JSON.parse(uploadFileRes.data));
			},
			fail: error => {
				uni.showToast({
					title: error,
					icon: "error",
					mask: true
				});
				reject(error);
			}
		});
	});
};

export default upload;
