<template>
	<view class="stock-wrap">
		<tui-sticky :scrollTop="scrollTop" stickyHeight="90rpx">
			<template v-slot:header>
				<uni-search-bar
					@confirm="handleSearch"
					v-model="searchValue"
					placeholder="搜索工单单编号"
					class="stock-search"
				></uni-search-bar>
			</template>
		</tui-sticky>
		<view class="stock-list">
			<template v-for="item in stockList">
				<view class="stock-list-item">
					<uni-card :title="item.title" @click="handleItemClick()">
						<template v-slot:header>
							<view class="stock-list-item-header">
								<text>{{ item.dataType }}</text>
								<tui-tag size="20rpx" padding="12rpx" v-if="current === 0">{{
									item.status
								}}</tui-tag>
							</view>
						</template>
						<view class="stock-list-item-content">
							<view class="stock-list-item-text">
								<text
									>工单编号：{{ item.workId > 0 ? item.workId : "暂无" }}</text
								>
								<text
									class="link"
									@click.stop="handleCopy(item.workId)"
									v-if="item.workId > 0"
									>复制</text
								>
							</view>
							<view class="stock-list-item-text">
								<text>打包总数：{{ item.total }}</text>
							</view>
							<view class="stock-list-item-text">
								<text>总重量：{{ item.weight }}</text>
							</view>
							<view class="stock-list-item-text" v-if="current === 0">
								<text>入库人员：{{ item.inStockUser }}</text>
							</view>
							<view class="stock-list-item-text" v-if="current === 0">
								<text>入库时间：{{ item.inStockTime }}</text>
							</view>
              <view class="stock-list-item-text" v-if="current === 1">
								<text>出库人员：{{ item.outStockUser }}</text>
							</view>
							<view class="stock-list-item-text" v-if="current === 1">
								<text>出库时间：{{ item.outStockTime }}</text>
							</view>
						</view>
					</uni-card>
				</view>
			</template>
			<tui-loadmore text="加载中..." v-if="loading"></tui-loadmore>
			<tui-nomore
				v-if="page.currentPage === page.totalPages && !loading"
				backgroundColor="#eeeeee"
			></tui-nomore>
			<tui-bottom-navigation
				:current="current"
				:itemList="itemList"
				@click="handleTabbar"
			></tui-bottom-navigation>
		</view>
	</view>
</template>

<script>
import { inStock, outStock } from "@/api/stock";

export default {
	components: {},
	data: () => ({
		loading: false,
		searchValue: "",
		scrollTop: 0,
		stockList: [],
		page: {
			pageSize: 10,
			currentPage: 1,
			total: 0,
			totalPages: 1
		},
		query: {},
		current: 0,
		itemList: [
			{
				text: "入库",
				type: 1
			},
			{
				text: "出库",
				type: 1
			}
		]
	}),
	computed: {},
	methods: {
		handleSearch() {
			this.query.workId = this.searchValue;
			this.page = {
				pageSize: 10,
				currentPage: 1,
				total: 0,
				totalPages: 1
			};
			this.stockList = [];
			this.getList(this.page);
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
		handleTabbar(e) {
			console.log(e);
			this.current = e.index;
			this.page = {
				pageSize: 10,
				currentPage: 1,
				total: 0,
				totalPages: 1
			};
			this.stockList = [];
			this.getList(this.page);
		},
		handleItemClick() {
			console.log(123);
		},
		getList(page, params = {}) {
			this.loading = true;
			if (this.current === 0) {
				inStock(
					page.currentPage,
					page.pageSize,
					Object.assign(params, this.query)
				).then(res => {
					const data = res.data.data;
					this.page.total = data.total;
					this.page.totalPages = data.pages;
					let records = data.records;
					records.forEach(item => {
						item.title = "涉敏销毁订单";
					});
					this.stockList = this.stockList.concat(records);
					this.loading = false;
				});
			} else {
				outStock(
					page.currentPage,
					page.pageSize,
					Object.assign(params, this.query)
				).then(res => {
					const data = res.data.data;
					this.page.total = data.total;
					this.page.totalPages = data.pages;
					let records = data.records;
					records.forEach(item => {
						item.title = "涉敏销毁订单";
					});
					this.stockList = this.stockList.concat(records);
					this.loading = false;
				});
			}
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
		this.stockList = [];
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
.stock-wrap {
	background-color: #eeeeee;
	.stock-search {
		background-color: #ffffff;
		box-shadow: 0 0 5px #ccc;
	}
	.stock-list {
		padding-bottom: 100rpx;
		&-item {
			margin-top: 20rpx;
			&-header {
				color: #666666;
				font-size: 34rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			&-content {
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

.link {
	color: #268efb;
	margin-left: 30rpx;
	&:active {
		background-color: #eeeeee;
	}
}
</style>
