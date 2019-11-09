# Uni-app 入门项目 Time

> 时间：2019-11-09 18:00:15
>
> 作者：zhongxia

学习采用 uni-app 开发 App，顺便猜猜坑。



## 一、需要去尝试的功能点

1. 熟悉 vue 语法

2. page.json 
   1. 配置 tabbar
   2. 配置 header 导航栏（搜索框，左右上角按钮）

3. 异步请求

   ```js
   // 异步请求
   uni.request({
   			url: 'https://cnodejs.org/api/v1/topics',
   			complete: result => {
   				if (result.data.success) {
   					this.topics = result.data.data;
   					console.log(this.topics);
   					uni.showToast({
   						title: '刷新数据完成',
   						icon: 'none'
   					});
   					uni.stopPullDownRefresh();
   				} else {
   					uni.showToast({
   						title: '获取话题列表失败',
   						icon: 'none'
   					});
   				}
   			}
   		});
   ```

   

4. 如何引入外部npm 包

   ```bash
   npm init -y
   npm install -S dayjs
   
   # 在需要用的地方， import 引入即可
   import dayjs from 'dayjs'
   ```

   

5. 如何覆盖组件样式

   ```css
   /*需要加上这个标识，否则无法覆盖*/
   /deep/ .class{
     /*覆盖样式*/
   }
   ```

6. uni-ui 不太靠谱

   本来想要 uni-swipe-action 来做左滑删除的，但是这个组件在 H5可以用，但是在 APP 内却不能用。尴尬

   还有出现问题，很难找到相对应的文档，说明社区中用这个来开发的还是比较少的

7. uni 提供的云打包

   这个云打包功能，的确实很好用，省去了对 android，ios 打包的了解，一键打包，有点好用。