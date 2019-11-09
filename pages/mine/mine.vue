<template>
	<view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../about/about">
					<text class="cuIcon-info"></text>
					<text class="text-grey">关于我们</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="timeline">
					<text class="cuIcon-time"></text>
					<text class="text-grey">时间轴</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../add-form/add">
					<text class="cuIcon-add"></text>
					<text class="text-grey">添加表单</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menuArrow: true,
			menuBorder: true,
			menuCard: false
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style></style>
