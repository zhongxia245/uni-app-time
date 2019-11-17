<template>
	<view class="container">
		<view class="page-body">
			<view class="wrapper">
				<view class="toolbar" @tap="format">
					<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
					<view class="iconfont icon-date" @tap="insertDate"></view>
					<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>
					<view class="iconfont icon-shanchu" @tap="clear"></view>
				</view>
				<editor
					id="editor"
					class="ql-container"
					placeholder="开始输入..."
					showImgSize
					showImgToolbar
					showImgResize
					@statuschange="onStatusChange"
					:read-only="readOnly"
					@ready="onEditorReady"
				></editor>
			</view>
		</view>
	</view>
</template>

<script>
import dayjs from '../../libs/dayjs.min.js';
export default {
	data() {
		return {
			readOnly: false,
			formats: {}
		};
	},
	// 右上角按钮点击
	onNavigationBarButtonTap(e) {
		this.editorCtx.getContents({
			complete: result => {
				let html = result.html;
				this.$store.commit('addDiary', {
					name: 'zhongxia',
					desc: html,
					date: dayjs().format('YYYY-MM-DD')
				});
				uni.showToast({
					title: '保存成功',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1000);
			}
		});
	},
	methods: {
		readOnlyChange() {
			this.readOnly = !this.readOnly;
		},
		onEditorReady() {
			uni
				.createSelectorQuery()
				.select('#editor')
				.context(res => {
					this.editorCtx = res.context;
				})
				.exec();
		},
		undo() {
			this.editorCtx.undo();
		},
		redo() {
			this.editorCtx.redo();
		},
		format(e) {
			let { name, value } = e.target.dataset;
			if (!name) return;
			// console.log('format', name, value)
			this.editorCtx.format(name, value);
		},
		onStatusChange(e) {
			const formats = e.detail;
			this.formats = formats;
		},
		insertDivider() {
			this.editorCtx.insertDivider({
				success: function() {
					console.log('insert divider success');
				}
			});
		},
		clear() {
			uni.showModal({
				content: '是否清空内容？',
				success: res => {
					if (res.confirm) {
						this.editorCtx.clear({
							success: function(res) {
								console.log('clear success');
							}
						});
					}
				}
			});
		},
		removeFormat() {
			this.editorCtx.removeFormat();
		},
		insertDate() {
			const date = new Date();
			const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
			this.editorCtx.insertText({
				text: formatDate
			});
		},
		insertImage() {
			uni.chooseImage({
				count: 1,
				success: res => {
					this.editorCtx.insertImage({
						src: res.tempFilePaths[0],
						alt: '图像',
						success: function() {
							console.log('insert image success');
						}
					});
				}
			});
		}
	},
	onLoad() {
		// uni.loadFontFace({
		// 	family: 'Pacifico',
		// 	source: 'url("https://sungd.github.io/Pacifico.ttf")'
		// });
	}
};
</script>

<style>
@import './editor-icon.css';

.wrapper {
	padding: 5px;
	height: 100vh;
	overflow: hidden;
}

.iconfont {
	display: inline-block;
	padding: 8px 8px;
	width: 24px;
	height: 24px;
	cursor: pointer;
	font-size: 20px;
	flex: 1;
	text-align: center;
}

.toolbar {
	box-sizing: border-box;
	border-bottom: 0;
	font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	display: flex;
	border-bottom: 1rpx solid #ebebeb;
	padding-bottom: 30rpx;
}

.ql-container {
	flex: 1;
	box-sizing: border-box;
	padding: 12px 15px;
	width: 100%;
	min-height: 30vh;
	height: auto;
	background: #fff;
	margin-top: 20px;
	font-size: 16px;
	line-height: 1.5;
	background-color: transparent;
}

.ql-active {
	color: #06c;
}
</style>
