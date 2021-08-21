<template>
	<div class="order-wrap">
		<uni-card :title="info.auditType" :isFull="true">
			<view class="order-info">
				<view class="order-info-item">
					<text>订单编号：{{ info.id }}</text>
					<text class="link" @click.stop="handleCopy(item.id)">复制</text>
				</view>
				<view class="order-info-item">
					<text>工单编号：{{ info.workId }}</text>
					<text class="link" @click.stop="handleCopy(item.workId)">复制</text>
				</view>
				<view class="order-info-item">
					<text>销毁证明编号：{{ info.destroyCertificateId }}</text>
					<text class="link" @click.stop="handleCopy(item.destroyCertificateId)"
						>复制</text
					>
				</view>
				<view class="order-info-item">
					工单状态：
					<template v-if="info.status === -1">已取消</template>
					<template v-else-if="info.status === 0">未接单</template>
					<template v-else-if="info.status === 1">已接单</template>
					<template v-else-if="info.status === 2">已完成</template>
				</view>
				<view class="order-info-item">
					<text>物流车牌号：{{ info.carNum }}</text>
				</view>
				<view class="order-info-item">
					<text>处理人：{{ info.handleUsername }}</text>
				</view>

				<tui-divider :height="20"></tui-divider>
				<view class="order-info-item">
					资料类型：
					<template v-if="info.dataType === 1">文件</template>
					<template v-else-if="info.dataType === 2">资料</template>
					<template v-else-if="info.dataType === 3">凭证</template>
					<template v-else-if="info.dataType === 4">档案</template>
				</view>
				<view class="order-info-item">
					预估重量：
					<template v-if="info.estimateWeight === 1">1吨以下</template>
					<template v-else-if="info.estimateWeight === 2">1~3吨</template>
					<template v-else-if="info.estimateWeight === 3">3吨以上</template>
				</view>
				<view class="order-info-item">
					<text>预估价格：{{ info.estimatePrice }}元</text>
				</view>

				<tui-divider :height="20"></tui-divider>
				<view class="order-info-item">
					<text>客户名称：{{ info.realName }}</text>
				</view>
				<view class="order-info-item">
					<text>上门联系人：{{ info.linkMan }}</text>
				</view>
				<view class="order-info-item">
					<text>上门电话：{{ info.phone }}</text>
				</view>
				<view class="order-info-item">
					<text>预约时间：{{ info.appointmentTime }}</text>
				</view>
				<view class="order-info-item">
					<text>下单时间：{{ info.createTime }}</text>
				</view>
				<view class="order-info-item">
					<text>备注：{{ info.remark }}</text>
				</view>

				<view class="order-info-media">
					<image
						class="image"
						v-if="info.image1"
						:src="info.image1"
						mode="aspectFit"
						@click="handleClickImage(info.image1)"
					/>
					<image
						class="image"
						v-if="info.image2"
						:src="info.image2"
						mode="aspectFit"
						@click="handleClickImage(info.image2)"
					/>
					<image
						class="image"
						v-if="info.image3"
						:src="info.image3"
						mode="aspectFit"
						@click="handleClickImage(info.image3)"
					/>
				</view>

				<view class="order-info-form">
					<view class="order-info-picker">
						<picker
							mode="selector"
							:range="handlerList"
							:value="handlerIndex"
							range-key="name"
							@change="handlerChange"
						>
							<tui-button type="white"
								>选择接单人员：{{ handlerList[handlerIndex].name }}</tui-button
							>
						</picker>
					</view>
					<view class="order-info-picker">
						<picker
							mode="selector"
							:range="plateList"
							:value="plateIndex"
							range-key="carNum"
							@change="plateChange"
						>
							<tui-button type="white"
								>选择物流车辆：{{ plateList[plateIndex].carNum }}</tui-button
							>
						</picker>
					</view>

					<view class="order-info-form-button">
						<tui-button @click="handleSubmit(true)">派单</tui-button>
					</view>
				</view>
			</view>
		</uni-card>
	</div>
</template>

<script>
import { sendOrder, getHandlers, getPlates } from "@/api/order";

export default {
	components: {},
	data: () => ({
		info: {},
		handlerList: [],
		handlerIndex: 0,
		plateList: [],
		plateIndex: 0
	}),
	computed: {
		previewImages() {
			let temp = [];
			if (this.info.image1) temp.push(this.info.image1);
			if (this.info.image2) temp.push(this.info.image2);
			if (this.info.image3) temp.push(this.info.image3);
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
		handleClickImage(url) {
			uni.previewImage({
				urls: this.previewImages,
				current: url
			});
		},
		handlerChange({ detail }) {
			this.handlerIndex = detail.value;
		},
		getHandlers() {
			getHandlers().then(res => {
				let { code, data, msg } = res.data;
				if (code === 200) {
					this.handlerList = data;
				} else {
					uni.showToast({
						title: msg,
						icon: "error",
						mask: true
					});
				}
			});
		},
		plateChange({ detail }) {
			this.plateIndex = detail.value;
		},
		getPlates() {
			getPlates().then(res => {
				let { code, data, msg } = res.data;
				if (code === 200) {
					this.plateList = data;
				} else {
					uni.showToast({
						title: msg,
						icon: "error",
						mask: true
					});
				}
			});
		},
		handleSubmit(e) {
			console.log(e);
			uni.showModal({
				title: "提示",
				content: "确认派单？",
				success: res => {
					if (res.confirm) {
						sendOrder({
							orderId: this.info.id,
							handleUserId: this.handlerList[this.handlerIndex].id,
							carNum: this.plateList[this.plateIndex].carNum
						}).then(res => {
							let { code, msg } = res.data;
							if (code === 200) {
								uni.showToast({
									title: msg,
									icon: "success",
									mask: true
								});
								uni.$emit("order");
								setTimeout(() => {
									uni.navigateBack();
								}, 1500);
							} else {
								uni.showToast({
									title: msg,
									icon: "error"
								});
							}
						});
					}
				}
			});
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.info = this.$store.state.order.orderItem;
		this.getHandlers();
		this.getPlates();
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
	onPullDownRefresh() {},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {}
	// 页面处理函数--监听页面滚动(not-nvue)
	// onPageScroll({ scrollTop }) {}
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.order-wrap {
	.order-info {
		font-size: 26rpx;
		&-item {
			height: 50rpx;
			display: flex;
			align-items: center;
		}
	}
	.order-info-form {
		margin-top: 30rpx;
		&-textarea {
			border: 1px solid #eeeeee;
			width: 100%;
			box-sizing: border-box;
			padding: 15rpx;
		}
		&-button {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
		}
	}
	.order-info-media {
		display: flex;
		align-items: center;
		gap: 20rpx;
		margin-top: 10rpx;
		.image {
			width: 200rpx;
			height: 200rpx;
			border: 1px solid #eeeeee;
		}
	}
	.order-info-picker {
		margin-bottom: 10rpx;
	}
}

.link {
	color: #268efb;
	margin-left: 30rpx;
	white-space: nowrap;
	&:active {
		background-color: #eeeeee;
	}
}
</style>
