<template>
	<div class="qrcode-wrap">
		<view class="qrcode-list">
			<template v-for="item in qrcodeList">
				<view class="qrcode-list-item">
					<uni-card note="true">
						<view class="qrcode-list-item-content">
							<uni-row>
								<uni-col :span="16">
									<view class="qrcode-list-item-text">
										<text>子包编号：{{ item.id }}</text>
									</view>
									<view class="qrcode-list-item-text">
										<text>工单编号：{{ item.workId }}</text>
									</view>
									<view class="qrcode-list-item-text">
										<text>客户：{{ item.realName }}</text>
									</view>
									<view class="qrcode-list-item-text">
										<text>处理人：{{ item.handleUser }}</text>
									</view>
									<view class="qrcode-list-item-text">
										<text>创建时间：{{ item.createTime }}</text>
									</view>
								</uni-col>
								<uni-col :span="8">
									<image
										class="qrcode-list-item-image"
										:src="item.qrCodePath"
										mode="scaleToFill"
									/>
								</uni-col>
							</uni-row>
						</view>
						<template v-slot:footer>
							<view class="qrcode-list-item-footer">
								<tui-button
									:size="24"
									height="42rpx"
									width="90rpx"
									@click="handlePrint(item)"
									>打印</tui-button
								>
							</view>
						</template>
					</uni-card>
				</view>
			</template>
			<tui-loadmore text="加载中..." v-if="loading"></tui-loadmore>
			<tui-nomore
				v-if="page.currentPage === page.totalPages && !loading"
				backgroundColor="#eeeeee"
			></tui-nomore>
		</view>
	</div>
</template>

<script>
import { getList } from "@/api/qrcode";

export default {
	components: {},
	data: () => ({
		loading: false,
		searchValue: "",
		qrcodeList: [],
		page: {
			pageSize: 10,
			currentPage: 1,
			total: 0,
			totalPages: 1
		},
		query: {
			workId: null
		}
	}),
	computed: {},
	methods: {
		getList(page, params = {}) {
			this.loading = true;
			getList(
				page.currentPage,
				page.pageSize,
				Object.assign(params, this.query)
			).then(res => {
				const data = res.data.data;
				uni.setNavigationBarTitle({
					title: `子包数量：${data.total}`
				});
				this.page.total = data.total;
				this.page.totalPages = data.pages;
				let records = data.records;
				records.forEach(item => {
					item.title = { text: "子包编号：" + item.id };
				});
				this.qrcodeList = this.qrcodeList.concat(records);
				this.loading = false;
			});
		},
		handlePrint(item) {}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad(e) {
		this.query.workId = e.id;
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
		this.qrcodeList = [];
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
	}
	// 页面处理函数--监听页面滚动(not-nvue)
	// onPageScroll({ scrollTop }) {}
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.qrcode-wrap {
	.qrcode-list {
		&-item {
			&-content {
				font-size: 24rpx;
				line-height: 36rpx;
			}
			&-text {
				display: flex;
				align-items: center;
				height: 50rpx;
			}
      &-image{
        width: 100%;
        height: 200rpx;
      }
			&-footer {
				display: flex;
				justify-content: flex-end;
			}
		}
	}
}
</style>
