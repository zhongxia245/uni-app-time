<template>
	<view class="padding">
		<form>
			<view class="cu-form-group">
				<view class="title">名称</view>
				<input v-model="data.name" placeholder="倒数日名称" />
			</view>
			<view class="cu-form-group align-start">
				<view class="title">描述</view>
				<textarea maxlength="-1" v-model="data.desc" placeholder="用几句话来描述下这件事吧~~"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">日期</view>
				<picker mode="date" start="1990-01-01" end="2100-01-01" :value="data.date" @change="dateChange">
					<view class="picker">{{ data.date }}</view>
				</picker>
			</view>
			<view class="flex margin-tb-lg">
				<button class="cu-btn bg-red lg" v-if="isEdit" :loading="loading" @click="onDel">删除</button>
				<button class="cu-btn bg-blue lg" :loading="loading" @click="submit">{{ isEdit ? '更新' : '添加' }}</button>
			</view>
		</form>
	</view>
</template>

<script>
import dayjs from '../../libs/dayjs.min.js';

export default {
	data() {
		return {
			loading: false,
			isEdit: false,
			dataIndex: null,
			data: {
				name: '',
				desc: '',
				date: dayjs().format('YYYY/MM/DD') // 默认当前时间
			}
		};
	},
	onLoad: function(option) {
		// 判断是否为编辑或者更新
		let index = Number(option.index);
		if (!isNaN(index)) {
			this.isEdit = true;
			this.dataIndex = index;

			uni.setNavigationBarTitle({
				title: '更新倒数日'
			});
			this.data = this.$store.state.home.list[index];
		}
	},
	methods: {
		// 选择日期
		dateChange(e) {
			this.data.date = e.detail.value;
		},
		onDel() {
			uni.showModal({
				title: '温馨提示',
				content: '是否删除该记录?',
				success: res => {
					if (res.confirm) {
						this.loading = true;
						let list = uni.getStorageSync('list') || [];
						list.splice(this.dataIndex, 1);

						uni.setStorage({
							key: 'list',
							data: list,
							complete: () => {
								uni.hideLoading();
								this.loading = false;
								if (this.isEdit) {
									uni.navigateBack({});
								} else {
									uni.switchTab({
										url: '../index/index'
									});
								}
							}
						});
					}
				}
			});
		},
		// 更新，创建数据
		submit() {
			if (!this.data.name) {
				uni.showToast({
					title: '名称不能为空',
					icon: 'none'
				});
				return;
			}

			this.loading = true;
			uni.showLoading({ title: '提交中...' });

			if (this.isEdit) {
				this.$store.commit('updateDiary', {
					index: this.dataIndex,
					data: this.data
				});
			} else {
				this.$store.commit('addDiary', this.data);
			}

			uni.hideLoading();
			this.loading = false;

			if (this.isEdit) {
				uni.navigateBack({});
			} else {
				uni.switchTab({
					url: '../index/index'
				});
			}
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
