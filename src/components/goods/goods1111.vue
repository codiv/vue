<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="_menuScroll(index,$event)">
					<span class="text border-1px"><em class="icon" v-show="item.type>0" :class="classMain[item.type]"></em>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list" ref="foodList">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon"><img :src="food.icon" width="57" height="57"></div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
const ERR_OK = 0
export default {
	data () {
		return {
			goods: [],
			classMain: [],
			listHeight: [],
			scrollY: 0
		}
	},
	computed: {
		currentIndex () {
			for (let i = 0; i < this.listHeight.length; i++) {
				let height1 = this.listHeight[i]
				let height2 = this.listHeight[i + 1]
				if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
					return i
				}
			}
			return 0
		}
	},
	created () {
		this.classMain = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

		this.$http.get('/api/goods').then((response) => {
			response = response.body
			if (response.errno === ERR_OK) {
				this.goods = response.data
				this.$nextTick(() => {
					this._goodScroll()
					this._foodListHeight()
				})
			}
		})
	},
	methods: {
		_menuScroll (index, event) {
			let foodList = this.$refs.foodList
			if (!event._constructed) { // 处理非手机运行时的点击问题（出现双点击问题）
				return
			}
			this.foodScrool.scrollToElement(foodList[index], 300) // 滚动到某个元素 300是动画时间
		},
		_goodScroll () {
			this.menuScroll = new BScroll(this.$refs.menuWrapper, {
				click: true // 打开侧边菜单的点击事件，因为better scroll默认禁止了tach、tap、click事件
			})

			this.foodScrool = new BScroll(this.$refs.foodWrapper, {
				probeType: 3 // 时时告诉我们效果，如滚动时
			})
			this.foodScrool.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y))// 配制“probeType: 3”才会实现时时取值
			})
		},
		_foodListHeight () {
			let foodList = this.$refs.foodList
			let height = 0
			this.listHeight.push(height)
			for (let i = 0; i < foodList.length; i++) {
				height += foodList[i].clientHeight
				this.listHeight.push(height)
			};
		}
	}
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.goods
	display:flex
	position:absolute
	top:174px
	bottom:46px
	width:100%
	overflow:hidden
	.menu-wrapper
		flex:0 0 80px
		width:80px
		background-color:#f3f5f7
		.menu-item
			display:table
			height:54px
			width:56px
			padding:0 12px
			line-height:14px
			&.current
				position:relative
				z-index:10
				margin-top:-1px
				background-color:#FFF
			.text
				display: table-cell
				vertical-align:middle	
				font-size:12px
				border-1px(rgba(7,17,27,0.1))
				font-weight:200
				.icon
					display:inline-block
					vertical-align:top
					height:12px
					width:12px
					margin-right:2px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						bg-images("decrease_3")
					&.discount
						bg-images("discount_3")
					&.guarantee
						bg-images("guarantee_3")
					&.invoice
						bg-images("invoice_3")
					&.special
						bg-images("special_3")
	.foods-wrapper
		flex:1
		.food-list
			.title
				padding-left:14px
				height:26px
				line-height:26px
				font-size:12px
				background-color:#f3f5f7
				border-left:2px solid #d9dde1
			.food-item
				display: flex
				margin: 18px
				padding-bottom: 18px
				position: relative
				border-1px(rgba(7,17,27,0.1))			
				&:last-child
					padding-bottom:0
				.icon
					flex:0 0 57px
					margin-right: 10px
				.content
					flex:1
					.name
						margin: 2px 0 8px 0
						height: 14px
						line-height: 14px
						font-size: 14px
						color: #07111b
					.desc,.extra
						line-height: 10px
						font-size: 10px
						color: #93999f
					.desc
						line-height: 12px
						margin-bottom: 8px
					.extra .count
						margin-right: 12px
					.price
						font-weight: 700
						line-height: 24px
						.now
							margin-right: 8px
							font-size: 14px
							color: #f01414
						.old
							text-decoration: line-through
							font-size: 10px
							color: #93999f
		
</style>
