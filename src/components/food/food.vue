<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" :alt="food.name">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="buy" @click.stop.prevent="cartFirst" v-show="food.count === 0 || !food.count">加入购物车
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food" @add="addFood"></cartcontrol>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import Vue from "vue";
	import BScroll from 'better-scroll';
	import cartcontrol from "components/cartcontrol/cartcontrol";
	export default{
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
				showFlag: false
			}
		},
		methods: {
			show () {
				this.showFlag = true;
				this.$nextTick(() => {
					if (!this.foodScroll) {
						this.foodScroll = new BScroll(this.$refs.food, {
							click: true
						})
					} else {
						this.foodScroll.refresh();
					}

				})
			},
			hide () {
				this.showFlag = false;
			},
			cartFirst (event) {
				if (!event._constructed) {
					return;
				}
				console.log(event.target)
				this.$emit('add', event.target);
				Vue.set(this.food, "count", 1)
			},
			addFood (target) {
//				console.log(target)
				this.$emit('add', target);
			}
		},
		components: {
			cartcontrol
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food
		position: fixed
		top: 0
		left: 0
		bottom: 48px
		width: 100%
		z-index: 20
		background-color: #FFF
		transform: translate3d(0, 0, 0)
		&.move-enter, &.move-leave-active
			transform: translate3d(100%, 0, 0)
		&.move-enter-active, &.move-leave-active
			transition: all 0.4s
		.food-content
			.image-header
				position: relative
				width: 100%
				height: 0
				padding-top: 100%
				img
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
					border: 0
				.back
					position: absolute
					top: 10px
					left: 0
					.icon-arrow_lift
						display: block
						padding: 10px
						font-size: 20px
						color: #fff
			.content
				position: relative
				padding: 18px
				.title
					line-height: 14px
					margin-bottom: 8px
					font-size: 14px
					font-weight: 700
					color: #07111b
				.detail
					margin-bottom: 18px
					line-height: 10px
					height: 10px
					font-size: 0
					color: #93999f
					.count, .rating
						margin-right: 12px
						font-size: 10px
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
				.buy
					position: absolute;
					right: 18px;
					bottom: 18px;
					z-index: 10;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing: border-box;
					border-radius: 12px;
					font-size: 10px;
					color: #fff;
					background: #00a0dc;
				.cartcontrol-wrapper
					position: absolute
					right: 12px
					bottom: 12px
</style>
