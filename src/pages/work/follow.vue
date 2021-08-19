<template>
	<div class="follow-wrap">
		<view class="follow-steps">
			<tui-steps
				:items="items"
				:titleSize="24"
				:activeSteps="activeSteps"
				@click="handleStepClick"
			></tui-steps>
		</view>
		<view class="follow-info">
			<view class="follow-info-title">
				<text>工单基本信息</text>
				<tui-tag size="22rpx" padding="12rpx">{{
					items[status - 1].title
				}}</tui-tag>
			</view>
			<view class="follow-info-content">
				<view class="follow-info-content-item">
					<text>工单编号：{{ workId }}</text>
					<text class="link" @click.stop="handleCopy(workId)">复制</text>
				</view>
				<view class="follow-info-content-item">
					<text>打包数：{{ basicInfo.total }}</text>
				</view>
				<view class="follow-info-content-item">
					<text>总重量：{{ basicInfo.weight }}</text>
				</view>
				<view class="follow-info-content-item">
					<text>操作员：{{ basicInfo.handleUsername }}</text>
				</view>
				<view class="follow-info-content-item">
					<text>车牌号：{{ basicInfo.carNum }}</text>
				</view>
				<view class="follow-info-content-item">
					<text>入库时间：{{ basicInfo.inStockTime }}</text>
				</view>
				<view class="follow-info-content-item">
					<text>出库时间：{{ basicInfo.outStockTime }}</text>
				</view>
				<view class="follow-info-content-item">
					<text>销毁证明编号：{{ basicInfo.destroyCertificateId }}</text>
					<text
						v-if="basicInfo.destroyCertificateId > 0"
						class="link"
						@click.stop="handleCopy(basicInfo.destroyCertificateId)"
						>复制</text
					>
				</view>
			</view>
		</view>
		<view class="follow-info-media" v-if="status != 7">
			<template v-if="previewImages.length > 0">
				<view class="title">图片预览</view>
				<uni-grid :column="3" :showBorder="false" :square="false">
					<uni-grid-item v-for="item in previewImages" :key="item">
						<view
							class="follow-info-media-image"
							@click="handleClickImage(item)"
						>
							<image class="content" :src="item" mode="aspectFit" />
						</view>
					</uni-grid-item>
				</uni-grid>
			</template>
			<template v-if="previewVideos.length > 0">
				<view class="title">视频预览</view>
				<video
					class="follow-info-media-video"
					v-for="item in previewVideos"
					:key="item"
					:src="item"
				/>
			</template>
		</view>
	</div>
</template>

<script>
import { followDetail } from "@/api/work";

export default {
	components: {},
	data: () => ({
		items: [
			{
				title: "上门打包",
				value: 1
			},
			{
				title: "搬运",
				value: 2
			},
			{
				title: "过磅卸车",
				value: 3
			},
			{
				title: "入库",
				value: 4
			},
			{
				title: "出库",
				value: 5
			},
			{
				title: "销毁",
				value: 6
			},
			{
				title: "已完成",
				value: 7
			}
		],
		activeSteps: 1,
		workId: null,
		status: 1,
		qrCodePackageId: [],
		workOperations: [],
		basicInfo: {}
	}),
	computed: {
		previewImages() {
			let temp = [];
			this.workOperations.forEach(item => {
				if (item.type == 1) {
					temp.push(item.filePath);
				}
			});
			return temp;
		},
		previewVideos() {
			let temp = [];
			this.workOperations.forEach(item => {
				if (item.type == 2) {
					temp.push(item.filePath);
				}
			});
			return temp;
		}
	},
	methods: {
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
		handleStepClick(e) {
			this.status = this.items[e.index].value;
			this.getDetails();
		},
		handleClickImage(url) {
			uni.previewImage({
				urls: this.previewImages,
				current: url
			});
		},
		getDetails() {
			uni.showLoading({
				title: "加载中"
			});
			let data = {
				workId: this.workId,
				status: this.status
			};
			followDetail(data)
				.then(res => {
					console.log(res.data);
					let { data, code } = res.data;
					if (code === 200) {
						this.basicInfo = data.workBaseInfoVO;
						this.qrCodePackageId = data.qrCodePackageId;
						this.workOperations = data.workOperations;

						this.activeSteps = this.basicInfo.status - 1;
						uni.hideLoading();
					}
				})
				.catch(() => {
					uni.hideLoading();
				});
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad(option) {
		this.workId = option.id;
		this.activeSteps = option.status - 1;
		this.status = option.status;

		this.getDetails();
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
.follow-wrap {
	.follow-steps {
		background-color: #ffffff;
		padding: 40rpx 10rpx;
	}
	.follow-info {
		margin-top: 1px;
		background-color: #fff;
		padding: 20rpx;
		&-title {
			font-size: 32rpx;
			display: flex;
			align-items: center;
			gap: 20rpx;
		}
		&-content {
			margin-top: 20rpx;
			&-item {
				font-size: 24rpx;
				line-height: 36rpx;
			}
		}
		&-media {
			margin-top: 1px;
			background-color: #fff;
			padding: 20rpx;
			.title {
				font-size: 28rpx;
				padding-bottom: 20rpx;
			}
			&-image {
				width: 220rpx;
				height: 200rpx;
				margin: 10rpx;
				box-sizing: border-box;
				border: 1px solid #eeeeee;
				.content {
					width: 100%;
					height: 100%;
				}
			}
			&-video {
				width: 100%;
				height: 300rpx;
				margin-bottom: 20rpx;
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
