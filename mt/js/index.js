// 定义过滤器
Vue.filter('priceFilter', function(price) {
	return price + '元';
})
Vue.filter('originPriceFilter', function(price) {
	return '门市价:' + price + '元';
})
Vue.filter('salesFilter', function(sales) {
	return '销量' + sales;
})
// 测试
// Util.ajax('data/home.json', function(res) {
// 	console.log(res)
// })
// 第二步 定义组件类
// 首页
var Home = {
	template: '#tpl_home',
	// 定义同步的数据
	data: function() {
		// 返回值是绑定的数据
		return {
			types: [
				{ id: 1, url: '01.png', title: '美食' },
				{ id: 2, url: '02.png', title: '电影' },
				{ id: 3, url: '03.png', title: '酒店' },
				{ id: 4, url: '04.png', title: '休闲娱乐' },
				{ id: 5, url: '05.png', title: '外卖' },
				{ id: 6, url: '06.png', title: 'KTV' },
				{ id: 7, url: '07.png', title: '周边游' },
				{ id: 8, url: '08.png', title: '丽人' },
				{ id: 9, url: '09.png', title: '小吃快餐' },
				{ id: 10, url: '10.png', title: '火车票',hot:true }
			],
			// 定义属性数据，让其具有特性
			ad: [],
			list: []
		}
	},
	// 请求数据
	created: function() {
		// 作用域是组件实例化对象
		this.$http.get('data/home.json').then(function(res) {
			// console.log(res, this)
			// 请求成功，存储数据
			this.ad = res.data.data.ad;
			this.list = res.data.data.list;
		})
	}
}




// 1 定义规则
var routes = [
	// 首页
	{
		path: '/home',
		component: Home
	},
	// 默认路由
	{
		path: '*',
		redirect: '/home'
	}
]
// 2 实例化
var router = new VueRouter({
	routes: routes
})
// 3 注册路由
// 创建vue实例化对象
var app = new Vue({
	el: '#app',
	router: router,
	// 绑定数据
	data:function(){
		return {
			banner_img:[
				{url:'01.jpg'},
				{url:'02.jpg'},
				{url:'03.jpg'},
				{url:'04.jpg'},
				{url:'05.jpg'},
				{url:'06.jpg'},
				{url:'01.jpg'}
			],
			left:0,
			startX:0,
			moveX:0,
			idx:0,
			width:document.documentElement.clientWidth,
			time:0.3,
			timer:'',
			nav:[],
			ad:[],
			lowPrice:[],
			commend:[]

		}
	},
	mounted:function(){
		var me = this;
		this.timer=setInterval(function(){
			me.idx++;
			me.left=-me.idx*me.width;
			setTimeout(function(){

	  			if(me.idx===6){
					me.idx=0;
					me.time=0
					me.left=-me.idx*me.width
					console.log('idx:'+me.idx)
				}
			},300)
			me.time=0.3
		}, 3000)
	},
	methods:{
		start:function(e){
			clearInterval(this.timer);
			this.startX = e.touches[0].clientX;
			// console.log(this.startX);
			this.time=0;
		},
		move:function(e){
			this.moveX = e.touches[0].clientX-this.startX;
			this.left = -this.idx*this.width+e.touches[0].clientX-this.startX;
			if(this.moveX<0 && this.idx === 6){
				this.idx=0;
			}else if(this.moveX>0&&this.idx===0){
				this.idx=6;
			}
			this.time=0
			
			
		},
		end:function(e){
			if(Math.abs(this.moveX)<this.width/3){
				this.left=-this.idx*this.width
			}else if(this.moveX<0){
				this.idx++;
				this.left=-this.idx*this.width
			}else if(this.moveX){
				this.idx--;
				console.log(this.idx)
				this.left=-this.idx*this.width
			}
			this.moveX=0;
			this.time=0.3;
			// console.log(this.time)
			var me=this;
			this.timer=setInterval(function(){
				me.idx++;
				me.left=-me.idx*me.width;
				setTimeout(function(){

		  			if(me.idx===6){
						me.idx=0;
						me.time=0
						me.left=-me.idx*me.width
						console.log('idx:'+me.idx)
					}
				},300)
				me.time=0.3
			}, 3000)
		},
		
	}
	
})