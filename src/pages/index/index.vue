<template>
	<view class="index-wrap">
		<image
			class="title-image"
			src="/static/images/background_index.jpg"
			mode="aspectFill"
			fade-show="false"
			:draggable="false"
		></image>
		<view class="index-container">
			<view class="welcome">
				<text class="text">欢迎回来，{{ username }}！</text>
				<tui-tag type="green" :scaleMultiple="0.8">管理员</tui-tag>
			</view>
			<view class="overview-wrap">
				<subtitle text="七日订单情况"></subtitle>
				<uni-row>
					<uni-col :span="6">
						<view class="content">
							<text class="value">2</text>
							<text class="desc">未接单</text>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="content">
							<text class="value">3</text>
							<text class="desc">已接单</text>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="content">
							<text class="value">38</text>
							<text class="desc">已完成</text>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="content">
							<text class="value">6</text>
							<text class="desc">已取消</text>
						</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="icon-wrap">
				<subtitle text="工单功能"></subtitle>
				<view class="icon-panel">
					<template v-for="item in workPanel">
						<navigator
							class="icon-item"
							:url="item.url"
							hover-class="active"
							:open-type="item.type || 'navigate'"
						>
							<view class="icon" :style="{ background: item.color }">
								<image :src="item.icon" mode="aspectFit" />
							</view>
							<text class="text">{{ item.name }}</text>
						</navigator>
					</template>
				</view>
			</view>
			<view class="position-wrap">
				<navigator>
					<text>GPS轨迹监控</text>
				</navigator>
				<switch
					class="position-switch"
          :checked="gpsSwitch"
					@change="gpsSwitchChange"
					color="green"
				/>
			</view>
			<view class="icon-wrap">
				<subtitle text="其他功能"></subtitle>
				<view class="icon-panel">
					<template v-for="item in otherPanel">
						<navigator
							class="icon-item"
							:url="item.url"
							hover-class="active"
							:open-type="item.type || 'navigate'"
						>
							<view class="icon" :style="{ background: item.color }">
								<image :src="item.icon" mode="aspectFit" />
							</view>
							<text class="text">{{ item.name }}</text>
						</navigator>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import subtitle from "@/components/subtitle/index.vue";

export default {
	components: {
		subtitle
	},
	data() {
		return {
			username: "李立强",
			workPanel: [
				{
					name: "工单管理",
					icon: "/static/icon/index/icon_work.png",
					color: "#3f9afb",
					url: "/pages/work/work",
					type: "switchTab"
				},
				{
					name: "打包管理",
					icon: "/static/icon/index/icon_work.png",
					color: "#fe735c",
					url: ""
				},
				{
					name: "出入库管理",
					icon: "/static/icon/index/icon_storage.png",
					color: "#ff8c12",
					url: ""
				},
				{
					name: "流程审批",
					icon: "/static/icon/index/icon_approve.png",
					color: "#16ae7d",
					url: ""
				},
				{
					name: "工单回访",
					icon: "/static/icon/index/icon_feedback.png",
					color: "#ff8c12",
					url: ""
				},
				{
					name: "二维码",
					icon: "/static/icon/index/icon_qrcode.png",
					color: "#16ae7d",
					url: ""
				}
			],
			gpsSwitch: false,
			otherPanel: [
				{
					name: "订单管理",
					icon: "/static/icon/index/icon_order.png",
					color: "#3f9afb",
					url: "/pages/order/order",
					type: "switchTab"
				},
				{
					name: "销毁证明",
					icon: "/static/icon/index/icon_report.png",
					color: "#fe735c",
					url: ""
				},
				{
					name: "视频管理",
					icon: "/static/icon/index/icon_video.png",
					color: "#ff8c12",
					url: ""
				}
			]
		};
	},
	onLoad() {},
	methods: {
		gpsSwitchChange({ detail }) {
			console.log(detail);
			this.gpsSwitch = detail.value;
		}
	}
};
</script>

<style lang="scss" scoped>
.index-wrap {
	position: relative;
  background-color: #fff;
  box-shadow: 0 0 5px #ccc;
  padding-bottom: 40rpx;

	.title-image {
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 369rpx;
	}
	.index-container {
		position: relative;
		z-index: 5;
		padding: 129rpx 30rpx 0 30rpx;
		.welcome {
			display: flex;

			.text {
				font-size: 40rpx;
				color: #ffffff;
			}
		}
		.overview-wrap {
			margin-top: 52rpx;
			width: 100%;
			background-color: #ffffff;
			border-radius: 18rpx;
			box-shadow: 0 0 10rpx #cccccc;
			.content {
				height: 180rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.desc {
					color: #999999;
					font-size: 20rpx;
				}
				.value {
					color: #ff9216;
					font-size: 40rpx;
					margin-bottom: 16rpx;
					white-space: nowrap;
				}
			}
		}

		.icon-wrap {
			margin-top: 20rpx;
			width: 100%;
			background-color: #ffffff;
			border-radius: 18rpx;
			box-shadow: 0 0 10rpx #cccccc;
			overflow: hidden;
			.icon-panel {
				display: flex;
				flex-wrap: wrap;
				.icon-item {
					height: 144rpx;
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					&:active {
						background: #eeeeee;
					}
					.icon {
						width: 80rpx;
						height: 80rpx;
						background: #cccccc;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 12rpx;
						margin-bottom: 14rpx;
						image {
							width: 36rpx;
							height: 36rpx;
						}
					}
					.text {
						color: #666666;
						font-size: 20rpx;
					}
				}
			}
		}

		.position-wrap {
			margin-top: 20rpx;
			width: 100%;
			background-color: #268efb;
			height: 88rpx;
			border-radius: 18rpx;
			box-shadow: 0 0 10rpx #268efb;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #ffffff;
			font-size: 24rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			.position-switch {
				transform: scale(0.8);
			}
		}
	}
}
</style>
