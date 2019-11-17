<template>
	<view>
		<view class="header bg-gradual-blue">
			<view><image class="avatar" :src="data.avatar" mode="scaleToFill"></image></view>
			<view class="margin-tb-sm username">{{ data.name }}</view>
			<view class="desc">{{ data.desc }}</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="user-form">
					<text class="cuIcon-edit"></text>
					<text class="text-grey">资料修改</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="timeline">
					<text class="cuIcon-time"></text>
					<text class="text-grey">时间轴</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../editor/editor">
					<text class="cuIcon-time"></text>
					<text class="text-grey">富文本编辑器</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../index/add">
					<text class="cuIcon-add"></text>
					<text class="text-grey">添加表单</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<view class="content" hover-class="none" @click="cleanStorage">
					<text class="cuIcon-settings"></text>
					<text class="text-grey">清除缓存</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../about/about">
					<text class="cuIcon-info"></text>
					<text class="text-grey">关于我们</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		data() {
			return this.$store.state.mine;
		}
	},
	onLoad() {
		console.log();
	},
	methods: {
		cleanStorage() {
			uni.showModal({
				content: '将会删除所有本地缓存的数据，确定删除吗？',
				success: res => {
					if (res.confirm) {
						this.$store.commit('clear');
						uni.removeStorage({
							key: 'list',
							complete: () => {
								uni.showToast({
									title: '清除成功',
									icon: 'none'
								});
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.header {
	padding: 40rpx 120rpx;
	text-align: center;
	line-height: 1.5;
}
.avatar {
	width: 160rpx;
	height: 160rpx;
	border-radius: 100%;
	border: 4rpx solid #ffffff;
}
.username {
	font-size: 34rpx;
}
.desc {
	overflow: hidden;
	display: block;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
</style>
