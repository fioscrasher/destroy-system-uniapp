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
					<tui-card :title="item.title" :tag="item.tag" full>
						<template v-slot:body>
							<view class="order-list-item-content">
								<uni-row>
									<uni-col :span="12">
										<text
											>工单编号：{{
												item.workId > 0 ? item.workId : "暂无"
											}}</text
										>
									</uni-col>
									<uni-col :span="12">
										<text
											>预估重量：<template v-if="item.estimateWeight === 1"
												>1吨以下</template
											><template v-else-if="item.estimateWeight === 2"
												>1~3吨</template
											><template v-else-if="item.estimateWeight === 3"
												>3吨以上</template
											>
										</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>订单编号：{{ item.id }}</text>
									</uni-col>
									<uni-col :span="12">
										<text>预估价格：{{ item.estimatePrice }}元</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>证明编号：{{ item.destroyCertificateId }}</text>
									</uni-col>
									<uni-col :span="12">
										<text>处理人：{{ item.handleUsername }}</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>客户：{{ item.realName }}</text>
									</uni-col>
									<uni-col :span="12">
										<text>车牌号：{{ item.carNum }}</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>联系人：{{ item.linkMan }}</text>
									</uni-col>
									<uni-col :span="12">
										<text>创建时间：{{ item.createTime }}</text>
									</uni-col>
								</uni-row>
								<uni-row>
									<uni-col :span="12">
										<text>联系电话：{{ item.phone }}</text>
									</uni-col>
									<uni-col :span="12">
										<text>预约时间：{{ item.appointmentTime }}</text>
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
import { getList } from "@/api/order";

export default {
	components: {},
	data: () => ({
		searchValue: "",
		scrollTop: 0,
		orderList: [],
		page: {
			pageSize: 10,
			currentPage: 1,
			total: 0
		}
	}),
	computed: {},
	methods: {
		handleSearch(e) {
			console.log(e);
		},
		getList(page, params = {}) {
			getList(
				page.currentPage,
				page.pageSize,
				Object.assign(params, this.query)
			).then(res => {
				const data = res.data.data;
				this.page.total = data.total;
				let records = data.records;
				records.forEach(item => {
					let arr = [];
					if (item.image1) arr.push(item.image1);
					if (item.image2) arr.push(item.image2);
					if (item.image3) arr.push(item.image3);
					if (item.destroyCertificateId == -1)
						item.destroyCertificateId = "暂无";
					item.image = arr.join(",");
					switch (item.status) {
						case -1:
							item.tag = { text: "已取消" };
							break;
						case 0:
							item.tag = { text: "未接单" };
							break;
						case 1:
							item.tag = { text: "已接单" };
							break;
						case 2:
							item.tag = { text: "已完成" };
							break;
						default:
							item.tag = { text: "" };
							break;
					}
					item.title = { text: "涉敏销毁订单" };
				});
				this.orderList = records;
			});
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.getList(this.page);
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
