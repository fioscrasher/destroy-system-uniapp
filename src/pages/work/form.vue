<template>
	<div class="follow-wrap">
		<uni-card
			title="子包确认"
			:extra="'需确认数量：' + qrCodePackageId.length"
			note="true"
			:isFull="true"
			v-if="basicInfo.status != 2 && basicInfo.status != 3"
		>
			<view class="follow-package">
				<text class="tips" v-if="qrCodePackageId.length === 0"
					>请先打包管理内添加子包</text
				>
				<template v-for="item in qrCodePackageId">
					<view v-if="scanCode.indexOf(item) === -1" class="gray">{{
						item
					}}</view>
					<view v-else class="primary">{{ item }}</view>
				</template>
			</view>
			<template v-slot:footer>
				<view class="follow-package-footer">
					<template v-if="basicInfo.status == 1">
						<tui-button
							style="margin-right: 20rpx;"
							:size="24"
							height="42rpx"
							width="90rpx"
							@click="toPrint"
							>打印</tui-button
						>
						<tui-button
							style="margin-right: 20rpx;"
							:size="24"
							height="42rpx"
							width="180rpx"
							@click="handleAdd"
							>生成打包记录</tui-button
						>
					</template>
					<tui-button
						:size="24"
						height="42rpx"
						width="90rpx"
						@click="handleScan()"
						>扫码</tui-button
					>
				</view>
			</template>
		</uni-card>
		<view class="follow-form">
			<htz-image-upload
				mediaType="all"
				:max="3"
				v-model="fileList"
				@chooseSuccess="handleUpload"
				@imgDelete="handleDelete"
			></htz-image-upload>
			<!-- <view class="follow-form-time">
				<tui-button type="white" :size="28" @click="handleTimeShow(1)"
					>视频剪辑时间：{{ startTime }}</tui-button
				>
				<tui-button type="white" :size="28" @click="handleTimeShow(2)"
					>视频结束时间：{{ endTime }}</tui-button
				>
			</view> -->
			<uni-easyinput
				type="textarea"
				v-model="remark"
				placeholder="请输入流程说明"
			></uni-easyinput>
			<template v-if="basicInfo.status == 3">
				<uni-easyinput
					type="number"
					v-model="weight"
					placeholder="请输入过磅重量"
					style="margin-top: 10rpx;"
				></uni-easyinput>
				<view class="switch">
					<switch :checked="destroyNow" @change="handleSwitchChange" />
					<text>是否直接销毁</text>
				</view>
			</template>
			<template v-if="basicInfo.status == 6">
				<text class="subtitle">选择销毁人员</text>
				<uni-data-checkbox
					mode="tag"
					:multiple="true"
					v-model="destroyUsers"
					:localdata="destroyUserList"
					:map="map"
				></uni-data-checkbox>
			</template>
		</view>

		<tui-bottom-navigation
			:itemList="itemList"
			@click="handleSubmit"
			backgroundColor="#268efb"
			color="#ffffff"
		></tui-bottom-navigation>
		<tui-datetime
			:type="6"
			ref="dateTime"
			@confirm="change"
			setDateTime="00:00"
		></tui-datetime>
	</div>
</template>

<script>
import htzImageUpload from "@/components/htz-image-upload/htz-image-upload.vue";
import {
	followDetail,
	upload,
	followSubmit,
	destroyUserList
} from "@/api/work";
import { add } from "@/api/package";

export default {
	components: {
		htzImageUpload
	},
	data: () => ({
		workId: null,
		itemList: [{ text: "提交" }],
		qrCodePackageId: [],
		workOperations: [],
		basicInfo: {},
		scanCode: [],
		imageStyle: {
			height: 80,
			width: 80
		},
		fileList: [],
		uploadFiles: [],
		// startTime: "00:00",
		// endTime: "00:00",
		timeSelecter: null,
		remark: "",
		weight: null,
		destroyNow: false,

		destroyUserList: [],
		destroyUsers: [],
		map: { text: "realName", value: "id" }
	}),
	computed: {},
	methods: {
		toPrint() {
			uni.navigateTo({
				url: `/pages/qrcode/print?id=${this.workId}`
			});
		},
		handleSwitchChange({ detail }) {
			this.destroyNow = detail.value;
		},
		handleTimeShow: function(type) {
			this.timeSelecter = type;
			this.$refs.dateTime.show();
		},
		// change: function(e) {
		// 	if (this.timeSelecter === 1) {
		// 		this.startTime = e.result;
		// 	} else if (this.timeSelecter === 2) {
		// 		this.endTime = e.result;
		// 	}
		// },
		getDestroyUserList() {
			destroyUserList().then(res => {
				let { code, data, msg } = res.data;
				if (code === 200) {
					this.destroyUserList = data;
				} else {
					uni.showToast({
						title: msg,
						icon: "none"
					});
				}
			});
		},
		handleScan() {
			uni.scanCode({
				success: res => {
					console.log(res);
					console.log(typeof res.result);
					if (this.scanCode.indexOf(res.result) >= 0) {
						uni.showToast({
							title: "已扫描此码",
							icon: "error"
						});
					}
					if (this.qrCodePackageId.indexOf(res.result) >= 0) {
						this.scanCode.push(res.result);
						uni.showToast({
							title: "扫描成功",
							icon: "success"
						});
					} else {
						uni.showToast({
							title: "未能正确识别",
							icon: "error"
						});
					}
				},
				fail: res => {
					console.log(res);
				}
			});
		},
		handleAdd() {
			add({
				workId: this.workId
			}).then(res => {
				let { code, msg } = res.data;
				if (code === 200) {
					uni.showToast({
						title: "生成子包成功！",
						icon: "success"
					});
					this.getDetails();
				} else {
					uni.showToast({
						title: msg,
						icon: "error"
					});
				}
			});
		},
		getDetails() {
			uni.showLoading({
				title: "加载中"
			});
			let data = {
				workId: this.workId,
				status: 1
			};
			followDetail(data)
				.then(res => {
					let { data, code } = res.data;
					if (code === 200) {
						this.basicInfo = data.workBaseInfoVO;
						this.qrCodePackageId = data.qrCodePackageId;
						this.workOperations = data.workOperations;
						uni.hideLoading();
						if (this.basicInfo.status == 6) {
							this.getDestroyUserList();
						}
					}
				})
				.catch(() => {
					uni.hideLoading();
				});
		},
		handleUpload(e, type) {
			for (let i = 0; i < e.length; i++) {
				const file = e[i];
				uni.showLoading({
					title: `正在上传第${i + 1}个文件`,
					mask: true
				});
				upload(file).then(res => {
					let { data, code } = res;
					if (code === 200) {
						this.fileList.push(data.link);
						this.uploadFiles.push({
							url: data.link,
							type: type == 1 ? "video" : "img"
						});
						uni.hideLoading();
					} else {
						uni.hideLoading();
						uni.showToast({
							title: "上传出错",
							icon: "error",
							mask: true
						});
					}
				});
			}
		},
		handleDelete(e) {
			for (let i = 0; i < this.uploadFiles.length; i++) {
				const item = this.uploadFiles[i];
				if (item.url == e.del) {
					let temp = [...this.uploadFiles];
					temp.splice(i, 1);
					this.uploadFiles = temp;
					break;
				}
			}
		},
		handleSubmit() {
			console.log(this.uploadFiles);
			if (
				this.basicInfo.status != 2 &&
				this.basicInfo.status != 3 &&
				this.scanCode.length !== this.qrCodePackageId.length
			) {
				uni.showToast({
					title: "请先扫码确认子包",
					icon: "error",
					mask: true
				});
				return;
			}
			let data = {
				workId: this.workId,
				// suggestTime: "00:" + this.startTime,
				remark: this.remark,
				qrCodeIds: this.qrCodePackageId,
				filePathMapList: this.uploadFiles
			};
			if (this.basicInfo.status == 3) {
				data.destroyNow = this.destroyNow ? 1 : 0;
				data.weight = this.weight;
			}
			if (this.basicInfo.status == 6) {
				data.destroyUsers = this.destroyUsers.join(",");
			}
			uni.showLoading({
				title: "加载中",
				mask: true
			});
			followSubmit(data).then(res => {
				let { code, msg } = res.data;
				if (code === 200) {
					uni.hideLoading();
					uni.showToast({
						title: msg,
						icon: "success",
						mask: true
					});
					uni.$emit("follow");
					uni.navigateBack({ delta: 1 });
				} else {
					uni.hideLoading();
					uni.showToast({
						title: msg,
						icon: "error",
						mask: true
					});
				}
			});
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad(option) {
		this.workId = option.id;
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
	padding-bottom: 100rpx;
	.follow-package {
		font-size: 28rpx;
		.tips {
			color: #666;
		}
		.gray {
			color: #666;
		}
		.primary {
			color: #268efb;
		}
	}
	.follow-package-footer {
		display: flex;
		justify-content: flex-end;
	}
	.follow-form {
		margin-top: 10rpx;
		background: #fff;
		padding: 20rpx;
		&-time {
			display: flex;
			margin-bottom: 10rpx;
		}
		.switch {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			gap: 20rpx;
			margin-top: 10rpx;
		}
	}

	.subtitle {
		font-size: 28rpx;
		color: #333333;
	}
}
</style>
