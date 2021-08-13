<template>
	<view class="order-wrap">
		<tui-sticky :scrollTop="scrollTop" stickyHeight="90rpx">
			<template v-slot:header>
				<uni-search-bar
					@confirm="handleSearch"
					v-model="searchValue"
					placeholder="搜索订单编号或者客户名称"
					class="order-search"
				></uni-search-bar>
			</template>
		</tui-sticky>
		<view class="order-list">
			<template v-for="item in orderList">
				<view class="order-list-item">
					<tui-card :title="item.title" :tag="item.tag">
						<template v-slot:body>
							<view class="order-list-item-content">
								<uni-row>
									<uni-col :span="12">
										<text>工单编号：111112232324234</text>
									</uni-col>
									<uni-col :span="12">
										<text>预估重量：3吨</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>订单编号：111112232324234</text>
									</uni-col>
									<uni-col :span="12">
										<text>预估价格：3000元</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>证明编号：111112232324234</text>
									</uni-col>
									<uni-col :span="12">
										<text>处理人：</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>客户：广州梵软</text>
									</uni-col>
									<uni-col :span="12">
										<text>车牌号：</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>联系人：李先生</text>
									</uni-col>
									<uni-col :span="12">
										<text>创建时间：2020-04-23</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>联系电话：18111111111</text>
									</uni-col>
									<uni-col :span="12">
										<text>更新时间：2020-04-23</text>
									</uni-col>
								</uni-row>
							</view>
						</template>
					</tui-card>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data: () => ({
		searchValue: "",
		scrollTop: 0,
		orderList: [
			{
				title: {
					text: "涉敏销毁订单"
				},
				tag: {
					text: "已接单"
				}
			}
		]
	}),
	computed: {},
	methods: {
		handleSearch(e) {
			console.log(e);
		}
	},
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
	onReachBottom() {},
	// 页面处理函数--监听页面滚动(not-nvue)
	onPageScroll({ scrollTop }) {
		this.scrollTop = scrollTop;
	}
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.order-wrap {
	background-color: #eeeeee;
	.order-search {
		background-color: #ffffff;
		box-shadow: 0 0 5px #ccc;
	}
	.order-list {
    padding-bottom: 20rpx;
		&-item {
			margin-top: 20rpx;
			&-content {
				padding: 20rpx;
				font-size: 24rpx;
				line-height: 36rpx;
			}
		}
	}
}
</style>
