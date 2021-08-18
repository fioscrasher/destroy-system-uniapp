<template>
	<view class="work-wrap">
		<tui-sticky :scrollTop="scrollTop" stickyHeight="90rpx">
			<template v-slot:header>
				<tui-dropdown-list :show="dropdownShow" :top="94" :height="400">
					<template v-slot:selectionbox>
						<view class="work-search">
							<uni-search-bar
								@confirm="handleSearch"
								v-model="searchValue"
								placeholder="搜索订单编号或者客户名称"
								class="work-search-input"
							></uni-search-bar>
							<tui-button
								class="work-search-category"
								width="90rpx"
								shape="rightAngle"
								:size="24"
								@click="dropdownShow = !dropdownShow"
							>
								<tui-icon name="category" color="#ffffff" :size="24"></tui-icon>
							</tui-button>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<view class="work-search-panel">
							<uni-data-checkbox
								mode="button"
								v-model="value"
								:localdata="range"
								@change="change"
							></uni-data-checkbox>
						</view>
					</template>
				</tui-dropdown-list>
			</template>
		</tui-sticky>
		<view class="work-list">
			<template v-for="item in workList">
				<view class="work-list-item">
					<tui-card :title="item.title" :tag="item.tag">
						<template v-slot:body>
							<view class="work-list-item-content">
								<uni-row>
									<uni-col :span="24">
										<view>
											工单编号：{{ item.id }}
											<text class="link" @click.stop="handleCopy(item.id)"
												>复制</text
											>
										</view>
										<view>客户：{{ item.realName }}</view>
										<view>处理人：{{ item.handleUsername }}</view>
										<view>创建时间：{{ item.createTime }}</view>
										<view>更新时间：{{ item.updateTime }}</view>
									</uni-col>
								</uni-row>
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
import { getList } from "@/api/work";

export default {
	components: {},
	data: () => ({
		searchValue: "",
		scrollTop: 0,
		dropdownShow: false,
		value: 0,
		range: [
			{ value: 0, text: "全部" },
			{ value: 1, text: "打包" },
			{ value: 2, text: "运输" },
			{ value: 3, text: "过磅" },
			{ value: 4, text: "入库" },
			{ value: 5, text: "出库" },
			{ value: 6, text: "销毁" },
			{ value: 7, text: "完成" }
		],
		workList: [],
		page: {
			pageSize: 10,
			currentPage: 1,
			total: 0,
			totalPages: 1
		},
    query: {
      status: null
    },
		loading: false
	}),
	computed: {},
	methods: {
		handleSearch(e) {
			console.log(e);
		},
		change({ detail }) {
			if (detail.value > 0) {
				this.query.status = detail.value;
			} else {
				this.query.status = null;
			}
			this.page = {
				pageSize: 10,
				currentPage: 1,
				total: 0,
				totalPages: 1
			};
			this.workList = [];
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
					item.tag = { color: "#268efb" };
					switch (item.status) {
						case 1:
							item.tag.text = "上门打包";
							break;
						case 2:
							item.tag.text = "搬运";
							break;
						case 3:
							item.tag.text = "过磅卸车";
							break;
						case 4:
							item.tag.text = "入库";
							break;
						case 5:
							item.tag.text = "出库";
							break;
						case 6:
							item.tag.text = "销毁";
							break;
						case 7:
							item.tag.text = "已完成";
							break;
						default:
							item.tag.text = "";
							break;
					}
					item.title = { text: "涉敏销毁订单" };
				});
				this.workList = this.workList.concat(records);
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
		this.workList = [];
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
.work-wrap {
	.work-search {
		background-color: #ffffff;
		box-shadow: 0 0 5px #ccc;
		display: flex;
		.work-search-input {
			flex-grow: 1;
		}
	}
	.work-search-panel {
		background-color: #ffffff;
		border: 1px solid #eeeeee;
		padding: 20rpx;
	}
	.work-list {
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

.link {
	color: #268efb;
	margin-left: 30rpx;
	&:active {
		background-color: #eeeeee;
	}
}
</style>
