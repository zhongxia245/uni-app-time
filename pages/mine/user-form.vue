<template>
	<view class="padding">
		<form>
			<view class="cu-form-group">
				<view class="title">名称</view>
				<input v-model="data.name" placeholder="请输入名称" />
			</view>
			<view class="cu-form-group align-start">
				<view class="title">签名</view>
				<textarea maxlength="-1" v-model="data.desc" placeholder="这个人很懒,什么都没有留下~~"></textarea>
			</view>
			<view class="flex margin-tb-lg"><button class="cu-btn bg-blue lg" :loading="loading" @click="submit">保存</button></view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			data: {
				name: this.$store.state.mine.name,
				desc: this.$store.state.mine.desc
			}
		};
	},
	onLoad: function(option) {},
	methods: {
		submit() {
			if (!this.data.name) {
				uni.showToast({
					title: '名称不能为空~~',
					icon: 'none'
				});
				return false;
			}

			this.$store.commit('updateUserInfo', this.data);
			uni.showToast({
				title: '修改成功',
				icon: 'none'
			});
			setTimeout(() => {
				uni.hideToast();
				uni.navigateBack({
					delta: 1
				});
			}, 1000);
		}
	}
};
</script>

<style scoped>
.flex .cu-btn {
	flex: 1;
	margin-right: 15rpx;
}
.flex .cu-btn:last-child {
	margin-right: 0;
}
</style>
