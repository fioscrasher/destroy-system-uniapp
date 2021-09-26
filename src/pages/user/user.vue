<template>
	<div class="user-wrap">
		<div class="header-wrap">
			<image
				class="header-image"
				:src="
					userInfo.avatar ? userInfo.avatar : '/static/images/user_default.png'
				"
				mode="aspectFill"
				fade-show="false"
				:draggable="false"
			></image>
			<div class="header-basic-info">
				<p class="username">{{ userInfo.user_name }}</p>
				<p class="desc">{{ userInfo.role_name }}</p>
			</div>
		</div>
		<tui-list-view>
			<!-- <tui-list-cell arrow>关于</tui-list-cell> -->
			<tui-list-cell arrow>
				<div class="cache">
					<text>当前缓存大小</text>
					<text>{{ cacheSize }}</text>
				</div>
			</tui-list-cell>
			<tui-list-cell>
				<div class="version">
					<text>版本</text>
					<text>1.1.0</text>
				</div>
			</tui-list-cell>
			<!-- <tui-list-cell arrow>更换密码</tui-list-cell> -->
			<tui-list-cell @click="phoneCall">
				<div class="version">
					<text>联系管理员</text>
					<text>020-83706783</text>
				</div>
			</tui-list-cell>
			<tui-list-cell>
				<div class="logout" @click="handleLogout">退出登录</div>
			</tui-list-cell>
		</tui-list-view>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	components: {},
	data: () => ({
		cacheSize: "0Kb"
	}),
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	methods: {
		handleLogout() {
			this.$store.dispatch("LogOut").then(() => {
				uni.reLaunch({
					url: "/pages/login/login"
				});
			});
		},
		countCacheSize() {
			let res = uni.getStorageInfoSync();
			if (res.currentSize < 800) {
				this.cacheSize = res.currentSize + " KB";
			} else {
				this.cacheSize = parseInt(res.currentSize / 1024) + " MB";
			}
		},
		phoneCall() {
			uni.makePhoneCall({
				phoneNumber: "02083706783"
			});
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.countCacheSize();
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
	onReachBottom() {}
	// 页面处理函数--监听页面滚动(not-nvue)
	/* onPageScroll(event) {}, */
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.user-wrap {
	.header-wrap {
		height: 369rpx;
		background-color: #268efb;
		display: flex;
		box-sizing: border-box;
		padding: 100rpx 30rpx 0 30rpx;
		align-items: center;
		.header-image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			overflow: hidden;
		}
		.header-basic-info {
			padding-left: 30rpx;
			.username {
				color: #ffffff;
				font-size: 36rpx;
			}
			.desc {
				color: #ffffff;
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}

	.cache {
		display: flex;
		justify-content: space-between;
		padding-right: 30rpx;
	}
	.version {
		display: flex;
		justify-content: space-between;
	}
	.logout {
		color: red;
		text-align: center;
	}
}
</style>
