<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highLight':totalCount>0}"><i class="icon-shopping_cart"></i></div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">
					另需配送费￥{{deliveryPrice}}元
				</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">{{payDecs}}</div>
			</div>
		</div>
		<div class="ball-contener">
			<div v-for="ball in balls">
				<transition name="drop" @before-enter="dropBefore" @enter="dropping" @after-enter="droped">
					<div class="ball" v-show="ball.show">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food border-1px" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">￥{{food.price*food.count}}</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food" @add="addFood"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="hideMask"></div>
		</transition>
	</div>
</template>

<!--suppress JSUnresolvedVariable -->
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import cartcontrol from 'components/cartcontrol/cartcontrol'

	export default {
		data () {
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				dropBalls: [],
				fold: true
			}
		},
		props: {
			selectFoods: {
				type: Array,
				default () {
					return []
				}
			},
			minPrice: {
				type: Number,
				default: 0
			},
			deliveryPrice: {
				type: Number,
				default: 0
			}
		},
		computed: {
			totalPrice () {
				let total = 0;
				this.selectFoods.forEach(function (food) {
					total += food.price * food.count;
				});
				//简写
//				this.selectFoods.forEach((food) => {
//					total += food.price * food.count;
//				});
				return total;
			},
			totalCount () {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDecs () {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`
				} else if (this.totalPrice < this.minPrice) {
					let def = this.minPrice - this.totalPrice
					return `还差￥${def}元起送`
				} else {
					return '去结算！'
				}
			},
			payClass () {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough'
				} else {
					return 'enough'
				}
			},
			listShow () {
				if (!this.totalCount) {
					this.fold = true;
					return false
				}
				let show = !this.fold;
				if (show) {
					this.$nextTick(() => {
						if (!this.listContent) {
							this.listContent = new BScroll(this.$refs.listContent, {
								click: true
							});
						} else {
							this.listContent.refresh();
						}
					});
				}
				return show;
			}
		},
		methods: {
			drop (el) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			dropBefore (el) {
				let count = this.balls.length;
				while (count--) {
					let ball = this.balls[count];
					if (ball.show) {
						let ref = ball.el.getBoundingClientRect();
						let x = ref.left - 32;
						let y = -(window.innerHeight - ref.top - 20);
						el.style.display = '';
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.transform = `translate3d(${x}px,0,0)`;
					}
				}
			},
			dropping (el, done) {
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight;
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					el.addEventListener('transitionend', done);
				});
			},
			droped (el) {
				let ball = this.dropBalls.shift();
				if (ball) {
					ball.show = false;
					el.style.display = 'none';
				}
			},
			toggleList () {
				if (this.totalCount > 0) {
					this.fold = !this.fold;
				}
			},
			addFood(target) {
				console.log(target)
				this.drop(target)
			},
			empty () {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				})
			},
			hideMask () {
				this.fold = true;
			}
		},
		components: {
			cartcontrol
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.shopcart
		position: fixed
		left: 0
		bottom: 0
		z-index: 50
		height: 48px
		width: 100%
		.content
			display: flex
			background-color: #141d27
			font-size: 0
			height: 48px
			color: rgba(255, 255, 255, 0.4)
			.content-left
				flex: 1
				.logo-wrapper
					display: inline-block
					position: relative
					top: -10px
					border-radius: 50%
					margin: 0 12px
					padding: 6px
					width: 56px
					height: 56px
					box-sizing: border-box
					background-color: #141d27
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						text-align: center
						background-color: #2b343c
						.icon-shopping_cart
							line-height: 44px
							font-size: 24px
							color: #80858a
						&.highLight
							background-color: #00a0dc
							.icon-shopping_cart
								color: #FFF
					.num
						position: absolute
						top: 0
						right: 0
						width: 24px
						height: 16px
						line-height: 16px
						text-align: center
						border-radius: 16px
						font-size: 9px
						font-weight: 700
						color: #fff
						background: #f01414
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
				.price
					display: inline-block
					vertical-align: top
					margin-top: 12px
					line-height: 24px
					padding-right: 12px;
					box-sizing: border-box
					border-right: 1px solid rgba(255, 255, 255, 0.1)
					font-size: 16px
					font-weight: 700
					&.highLight
						color: #FFF
				.desc
					display: inline-block
					vertical-align: top
					margin: 12px 0 0 12px
					line-height: 24px
					font-size: 10px
			.content-right
				flex: 0 0 105px
				width: 105px
				.pay
					height: 48px
					line-height: 48px
					text-align: center
					font-size: 12px
					font-weight: 700
					&.not-enough
						background-color: #2b333b
					&.enough
						background-color: #00b43c
						color: #FFF
		.ball-contener
			.ball
				position: fixed;
				left: 32px;
				bottom: 22px;
				z-index: 200;
				z-index: 200
				transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
				.inner
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: #00a0dc;
					transition: all 0.4s linear
	.shopcart-list
		position: absolute
		top: 0
		left: 0
		z-index: -1
		width: 100%
		transform: translate3d(0, -100%, 0)
		&.fold-enter, &.fold-leave-active
			transform: translate3d(0, 0, 0)
		&.fold-enter-active, &.fold-leave-active
			transition: all 0.5s
		.list-header
			height: 40px
			line-height: 40px
			padding: 0 18px
			background: #f3f5f7
			border-1px(rgba(7, 17, 27, 0.1))
			.title
				float: left
				font-size: 14px
				color: #07111b
			.empty
				float: right
				font-size: 12px
				color: #00a0dc
		.list-content
			padding: 0 18px
			max-height: 217px
			overflow: hidden
			background: #fff
			.food
				position: relative
				padding: 12px 0
				box-sizing: border-box
				border-1px(rgba(7, 17, 27, 0.1))
				.name
					line-height: 24px
					font-size: 14px
					color: #07111b
				.price
					position: absolute
					right: 90px
					bottom: 12px
					line-height: 24px
					font-size: 14px
					font-weight: 700
					color: #f01414
				.cartcontrol-wrapper
					position: absolute
					right: 0
					bottom: 6px
	.list-mask
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		backdrop-filter:blur(10px)
		background: rgba(7, 17, 27, 0.6)
		z-index: -2
		opacity: 1
		transition: all 0.5s
		&.fade-enter, &.fade-leave-active
			opacity: 0
		&.fade-enter-active, &.fade-leave-active
			transition: all 0.5s
</style>
