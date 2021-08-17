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
				<view class="order-list-item" @click="handleItemClick()">
					<tui-card :title="item.title" :tag="item.tag">
						<template v-slot:body>
							<view class="order-list-item-content">
								<view class="order-list-item-text">
									<text>订单编号：{{ item.id }}</text>
									<text class="link" @click.stop="handleCopy(item.id)"
										>复制</text
									>
								</view>
								<view class="order-list-item-text">
									<text
										>工单编号：{{
											item.workId > 0 ? item.workId : "暂无"
										}}</text
									>
									<text
										class="link"
										@click.stop="handleCopy(item.workId)"
										v-if="item.workId > 0"
										>复制</text
									>
								</view>
								<view class="order-list-item-text">
									<text>客户：{{ item.realName }}</text>
								</view>
								<view class="order-list-item-text">
									<text>创建时间：{{ item.createTime }}</text>
								</view>
								<view class="order-list-item-text">
									<text>处理人：{{ item.handleUsername }}</text>
								</view>
								<view class="order-list-item-text">
									<text>证明编号：{{ item.destroyCertificateId }}</text>
									<text
										class="link"
										@click.stop="handleCopy(item.destroyCertificateId)"
										v-if="Number(item.destroyCertificateId)"
										>复制</text
									>
								</view>
							</view>
						</template>
					</tui-card>
				</view>
			</template>
			<tui-loadmore text="加载中..." v-if="loading"></tui-loadmore>
			<tui-nomore
				v-if="page.currentPage === page.totalPages && !loading"
				backgroundColor="#eeeeee"
			></tui-nomore>
		</view>
	</view>
</template>

<script>
import { getList } from "@/api/order";

export default {
	components: {},
	data: () => ({
		loading: false,
		searchValue: "",
		scrollTop: 0,
		orderList: [],
		page: {
			pageSize: 10,
			currentPage: 1,
			total: 0,
			totalPages: 1
		}
	}),
	computed: {},
	methods: {
		handleSearch(e) {
			console.log(e);
		},
		handleCopy(text) {
			uni.setClipboardData({
				data: text,
				success: function() {
					uni.showToast({
						title: "已复制"
					});
				}
			});
		},
    handleItemClick(){
      console.log(123)
    },
		getList(page, params = {}) {
			this.loading = true;
			getList(
				page.currentPage,
				page.pageSize,
				Object.assign(params, this.query)
			).then(res => {
				const data = res.data.data;
				this.page.total = data.total;
				this.page.totalPages = data.pages;
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
							item.tag = { text: "已取消", color: "#268efb" };
							break;
						case 0:
							item.tag = { text: "未接单", color: "#268efb" };
							break;
						case 1:
							item.tag = { text: "已接单", color: "#268efb" };
							break;
						case 2:
							item.tag = { text: "已完成", color: "#268efb" };
							break;
						default:
							item.tag = { text: "" };
							break;
					}
					item.title = { text: "涉敏销毁订单" };
				});
				this.orderList = this.orderList.concat(records);
				this.loading = false;
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
		this.page = {
			pageSize: 10,
			currentPage: 1,
			total: 0,
			totalPages: 1
		};
		this.orderList = [];
		this.getList(this.page);
		uni.stopPullDownRefresh();
	},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {
		if (!this.loading)
			if (this.page.currentPage < this.page.totalPages) {
				this.page.currentPage++;
				this.getList(this.page);
			}
	},
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
			&-text {
				display: flex;
				align-items: center;
				height: 50rpx;
			}
		}
	}
}

.link{
  color: #268efb;
  margin-left: 30rpx;
  &:active{
    background-color: #eeeeee;
  }
}
</style>
