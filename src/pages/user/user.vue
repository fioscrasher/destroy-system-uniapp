<template>
	<div class="user-wrap">
		<div class="header-wrap">
			<image
				class="header-image"
				src="/static/images/R-C.png"
				mode="aspectFill"
				fade-show="false"
				:draggable="false"
			></image>
			<div class="header-basic-info">
				<p class="username">李立强</p>
				<p class="desc">管理员</p>
			</div>
		</div>
		<tui-list-view>
			<tui-list-cell arrow>关于</tui-list-cell>
			<tui-list-cell arrow>
				<div class="cache">
					<text>清理缓存</text>
					<text>200MB</text>
				</div>
			</tui-list-cell>
			<tui-list-cell>
				<div class="version">
					<text>版本</text>
					<text>1.0.0</text>
				</div>
			</tui-list-cell>
      <tui-list-cell arrow>更换密码</tui-list-cell>
      <tui-list-cell>
				<div class="version">
					<text>联系管理员</text>
					<text>020-0288-0288</text>
				</div>
			</tui-list-cell>
      <tui-list-cell>
        <div class="logout">退出登录</div>
      </tui-list-cell>
		</tui-list-view>
	</div>
</template>

<script>
export default {
	components: {},
	data: () => ({}),
	computed: {},
	methods: {},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {},
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
  .version{
    display: flex;
		justify-content: space-between;
  }
  .logout{
    color: red;
    text-align: center;
  }
}
</style>
