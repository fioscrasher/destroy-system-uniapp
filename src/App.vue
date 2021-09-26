<script>
import { calcDate, dateFormat } from "@/util/date.js";
import { getStore } from "@/util/store.js";
import { validatenull } from "@/util/validate";
import { uploadPosition } from "@/api/device";

export default {
	data() {
		return {
			//刷新token锁
			refreshLock: false,
			positionInterval: null
		};
	},
	onLaunch: function() {
		console.log("App Launch");
		this.refreshToken();
		this.devicePosition();
	},
	onShow: function() {
		console.log("App Show");
	},
	onHide: function() {
		console.log("App Hide");
	},
	methods: {
		// 定时检测token
		refreshToken() {
			this.refreshTime = setInterval(() => {
				const token =
					getStore({
						name: "token",
						debug: true
					}) || {};
				const date = calcDate(token.datetime, new Date().getTime());
				if (validatenull(date)) return;
				if (date.seconds >= 3000 && !this.refreshLock) {
					this.refreshLock = true;
					this.$store
						.dispatch("refreshToken")
						.then(() => {
							this.refreshLock = false;
						})
						.catch(() => {
							this.refreshLock = false;
						});
				}
			}, 10000);
		},
		// 设备定位
		devicePosition() {
			this.positionInterval = setInterval(() => {
				console.log(
					"position status:" + this.$store.state.device.positionAvailable
				);
				if (this.$store.state.device.positionAvailable) {
					uni.getLocation({
						type: "gcj02",
						success: res => {
							console.log("position success：", res);
							let arr = this.$store.state.device.positionData;
							// if (arr.length > 0)
							// 	if (
							// 		arr[arr.length - 1].longitude == res.longitude &&
							// 		arr[arr.length - 1].latitude == res.latitude
							// 	) {
							// 		return false;
							// 	}
							if (arr.length >= 1) {
								this.uploadPosition(arr);
								arr = [];
							}
							res.createTime = dateFormat(new Date());
							arr.push(res);
							this.$store.commit("SET_POSITION_DATA", arr);
							console.log(arr);
						}
					});
				} else {
					let arr = this.$store.state.device.positionData;
					if (arr.length > 0) {
						this.uploadPosition(arr);
						this.$store.commit("SET_POSITION_DATA", []);
					}
				}
			}, 30000);
		},
		uploadPosition(arr) {
			let temp = [];
			arr.forEach(item => {
				temp.push({
					createTime: item.createTime,
					latitude: item.latitude,
					longitude: item.longitude,
					speed: item.speed || 0
				});
			});
			uploadPosition(temp)
				.then(res => {
					console.log(res);
				})
				.catch(() => {
					uni.showToast({
						title: "定位提交出错，已停止定位",
						icon: "none",
						mask: true
					});
					clearInterval(this.positionInterval);
					this.$store.commit("SET_POSITION_AVAILABLE", false);
				});
		}
	},
	watch: {
		"$store.state.device.positionAvailable": function() {
			if (!this.positionInterval) {
				this.devicePosition();
			}
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
body {
	background-color: #eeeeee;
}
.tui-bottom-navigation {
	z-index: 995 !important;
}
.uni-tabbar__label {
	font-weight: bold;
}
</style>
