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
				<van-tag type="success">管理员</van-tag>
			</view>
			<view class="overview-wrap">
				<subtitle text="七日订单情况"></subtitle>
				<van-row>
					<van-col span="6">
						<view class="content">
							<text class="value">2</text>
							<text class="desc">未接单</text>
						</view>
					</van-col>
					<van-col span="6">
						<view class="content">
							<text class="value">3</text>
							<text class="desc">已接单</text>
						</view>
					</van-col>
					<van-col span="6">
						<view class="content">
							<text class="value">38</text>
							<text class="desc">已完成</text>
						</view>
					</van-col>
					<van-col span="6">
						<view class="content">
							<text class="value">6</text>
							<text class="desc">已取消</text>
						</view>
					</van-col>
				</van-row>
			</view>
			<view class="icon-wrap">
				<subtitle text="工单功能"></subtitle>
				<view class="icon-panel">
					<view class="icon-item">
						<view class="icon" >
							<image src="/static/icon/index/icon_work.png" mode="aspectFit" />
						</view>
						<text class="text">工单管理</text>
					</view>
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
			username: "李立强"
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.index-wrap {
	position: relative;

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
					.icon {
						width: 80rpx;
						height: 80rpx;
						background-color: red;
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
	}
}
</style>
