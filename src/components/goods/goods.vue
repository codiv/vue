<template>
	<div>
		<div id="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item, index) in goods" class="menu-item" :class="{current:scrolIndex===index}"
						@click="onMenu(index,$event)">
					<span class="text border-1px">
						<em class="icon" v-if="item.type>0" :class="classMain[item.type]"></em>{{item.name}}
					</span>
					</li>
				</ul>
			</div>
			<div class="food-wrapper" ref="foodWrapper">
				<ul>
					<li class="food-list" v-for="item in goods" ref="foodList">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li class="food-item border-1px" v-for="food in item.foods"
								@click="selectFood(food,$event)">
								<div class="icon" v-if="food.icon"><img :src="food.icon" width="57" height="57"></div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food" @add="addFood"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart ref="onshopcart" :selectFoods="selectFoods" :minPrice="seller.minPrice"
					  :deliveryPrice="seller.deliveryPrice"></shopcart>
		</div>
		<food ref="food" :food="selectedFood"></food>
	</div>
</template>

<!--suppress JSUnresolvedVariable -->
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import food from 'components/food/food';

	let ERR_OK = 0;

	export default{
		data () {
			return {
				goods: [],
				classMain: [],
				listHeihgt: [],
				scrollY: 0,
				selectedFood: {}
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		created () {
			this.classMain = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('api/goods', {name: "abc"}).then((response) => {
				let res = response.body;
				if (res.errno === ERR_OK) {
					this.goods = res.data;
					this.$nextTick(() => {
						this._menuScroll();
						this.foodListNum();
					})
				}
			})
		},
		methods: {
			_menuScroll () {
				this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.foodWrapper = new BScroll(this.$refs.foodWrapper, {
					probeType: 3,
					click: true
				});
				this.foodWrapper.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.floor(pos.y))
				})
			},
			onMenu (index, event) {
				let foodList = this.$refs.foodList;
				if (!event._constructed) {
					return
				}
				this.foodWrapper.scrollToElement(foodList[index], 300)
			},
			foodListNum () {
				let foodList = this.$refs.foodList;
				let height = 0;
				this.listHeihgt.push(height);
				for (let i = 0; i < foodList.length; i++) {
					height += foodList[i].clientHeight;
					this.listHeihgt.push(height)
				}
			},
			addFood(target) {
				//优化手机小球落下动画
				this.$nextTick(() => {
					this.$refs.onshopcart.drop(target);
				});
			},
			selectFood (food, event) {
				if (!event._constructed) {
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			}
		},
		computed: {
			scrolIndex () {
				for (let i = 0; i < this.listHeihgt.length; i++) {
					let height1 = this.listHeihgt[i];
					let height2 = this.listHeihgt[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods () {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		}
	}

</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	#goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				display: table
				height: 54px
				width: 56px
				padding: 0 12px
				line-height: 14px
				font-size: 0
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight: 700
					.text
						border-none()
				.text
					display: table-cell
					width: 56px
					vertical-align: middle
					font-size: 12px
					border-1px(rgba(7, 17, 27, 0.2))
					.icon
						display: inline-block
						width: 12px
						height: 12px
						margin-right: 2px
						background-size: 12px 12px
						background-repeat: no-repeat
						vertical-align: top
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
		.food-wrapper
			flex: 1
			.title
				padding-left: 14px
				height: 26px
				line-height: 26px
				border-left: 2px solid #d9dde1
				font-size: 12px
				color: #93999f
				background: #f3f5f7
			.food-item
				display: flex
				position: relative
				margin: 18px
				padding-bottom: 18px
				border-1px(rgba(7, 17, 27, 0.1))
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					flex: 1
					.name
						margin: 2px 0 8px 0
						height: 14px
						line-height: 14px
						font-size: 14px
						color: #07111b
					.desc, .extra
						font-size: 10px
						line-height: 10px
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
					.cartcontrol-wrapper
						position: absolute
						right: 0
						bottom: 12px
</style>
