<script>
import { calcDate } from "@/util/date.js";
import { getStore } from "@/util/store.js";
import { validatenull } from "@/util/validate";

export default {
	data() {
		return {
			//刷新token锁
			refreshLock: false
		};
	},
	onLaunch: function() {
		console.log("App Launch");
    this.refreshToken();
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
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
body {
	background-color: #eeeeee;
}
.tui-bottom-navigation{
  z-index: 995 !important;
}
</style>
