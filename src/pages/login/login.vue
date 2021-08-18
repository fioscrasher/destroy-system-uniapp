<template>
	<div class="login-wrap">
		<image src="/static/images/user_default.png" class="title-image" />
		<view class="form-wrap">
			<view class="username form-wrap-item">
				<tui-icon name="people" color="#ffffff"></tui-icon>
				<input
					class="form-wrap-item-input"
					v-model="loginForm.username"
					placeholder="用户名/手机号"
					placeholder-class="form-placeholder"
					:disabled="loading"
				/>
			</view>
			<view class="username form-wrap-item">
				<tui-icon name="pwd" color="#ffffff"></tui-icon>
				<input
					type="password"
					class="form-wrap-item-input"
					v-model="loginForm.password"
					placeholder="密码"
					placeholder-class="form-placeholder"
					:disabled="loading"
				/>
			</view>
			<!-- <view class="username form-wrap-item">
				<image
					:src="loginForm.image"
					class="form-wrap-item-image"
					mode="scaleToFill"
				/>
				<input
					:maxlength="6"
					class="form-wrap-item-input"
					v-model="loginForm.code"
					placeholder="验证码"
					placeholder-class="form-placeholder"
					:disabled="loading"
				/>
			</view> -->
			<view class="form-wrap-item-button">
				<tui-button
					:loading="loading"
					:disabled="loading"
					@click.native.prevent="handleLogin"
				>
					登录</tui-button
				>
			</view>
		</view>
	</div>
</template>

<script>
const form = require("thorui-uni/lib/common/tui-validation/tui-validation.js");
import { getCaptcha } from "@/api/user";

export default {
	components: {},
	data: () => ({
		loginForm: {
			//租户ID
			tenantId: "000000",
			//用户名
			username: "",
			//密码
			password: "",
			//账号类型
			type: "account",
			//验证码的值
			code: "",
			//验证码的索引
			key: "",
			//预加载白色背景
			image:
				"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
		},
		loading: false,
		rules: [
			{
				name: "username",
				rule: ["required"],
				msg: ["请输入用户名或手机号"]
			},
			{
				name: "password",
				rule: ["required"],
				msg: ["请输入密码"]
			},
			// {
			// 	name: "code",
			// 	rule: ["required"],
			// 	msg: ["请输入验证码"]
			// }
		]
	}),
	computed: {},
	methods: {
		refreshCode() {
			getCaptcha().then(res => {
				const data = res.data;
				this.loginForm.key = data.key;
				this.loginForm.image = data.image;
			});
		},
		handleLogin() {
			let checkRes = form.validation(this.loginForm, this.rules);
			console.log(checkRes);
			if (!checkRes) {
				this.loading = true;
				this.$store
					.dispatch("LoginByUsername", this.loginForm)
					.then(() => {
						this.loading = false;
						uni.switchTab({
							url: "/pages/index/index"
						});
					})
					.catch(() => {
						this.loading = false;
						this.refreshCode();
					});
			} else {
				uni.showToast({
					title: checkRes,
					icon: "error"
				});
			}
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		// this.refreshCode();
	},
	// 页面周期函数--监听页面初次渲染完成
	onReady() {},
	// 页面周期函数--监听页面显示(not-nvue)
	onShow() {},
	// 页面周期函数--监听页面隐藏
	onHide() {},
	// 页面周期函数--监听页面卸载
	onUnload() {},
	// 页面处理函数--监听用户下拉动作
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
	},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {},
	// 页面处理函数--监听页面滚动(not-nvue)
	/* onPageScroll(event) {}, */
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
	onBackPress() {
		return false;
	}
};
</script>

<style lang="scss" scoped>
.login-wrap {
	width: 100%;
	height: 100vh;
	background-color: #268efb;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.title-image {
		width: 280rpx;
		height: 280rpx;
	}
	.form-wrap {
		width: 80%;
		margin-top: 50rpx;
		height: 420rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		&-item {
			width: 100%;
			height: 100rpx;
			box-sizing: border-box;
			padding: 0 20rpx;
			background-color: rgba(255, 255, 255, 0.4);
			border-radius: 12rpx;
			display: flex;
			align-items: center;
			&-input {
				margin-left: 20rpx;
				width: 100%;
				color: #ffffff;
			}
			&-image {
				height: 80rpx;
				width: 280rpx;
			}
		}
		&-item-button {
			margin-top: 50rpx;
		}
	}
}

.form-placeholder {
	color: #eeeeee;
}
</style>
