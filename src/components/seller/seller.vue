<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite">
					<span class="icon-favorite"></span>
					<span class="text">收藏</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">

			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BSscroll from 'better-scroll';
	import star from 'components/star/star';
	import split from 'components/split/split';
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		created () {
			this.$nextTick(() => {
				this.scroll = new BSscroll(this.$refs.seller, {
					click: true
				})
			})
		},
		components: {
			star,
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.seller
		position: absolute
		top: 174px
		left: 0
		bottom: 0
		width: 100%
		overflow: hidden;
		.overview
			position: relative;
			padding: 18px;
			.title
				margin-bottom: 8px;
				line-height: 14px;
				color: #07111b;
				font-size: 14px;
			.desc
				padding-bottom: 18px;
				font-size: 0;
				border-1px(rgba(7, 17, 27, 0.1))
				.star
					display: inline-block;
					margin-right: 8px;
					vertical-align: top;
				.text
					display: inline-block;
					margin-right: 12px;
					line-height: 18px;
					vertical-align: top;
					font-size: 10px;
					color: #4d555d;
			.remark
				display: flex;
				padding-top: 18px;
				.block
					flex: 1;
					text-align: center;
					border-right: 1px solid rgba(7, 17, 27, 0.1);
					h2
						margin-bottom: 4px;
						line-height: 10px;
						font-size: 10px;
						color: #93999f;
					&:last-child
						border: none
					.content
						line-height: 24px;
						font-size: 10px;
						color: #07111b;
						.stress
							font-size: 24px;
			.favorite
				position: absolute;
				width: 50px;
				right: 11px;
				top: 18px;
				text-align: center;
				.icon-favorite
					display: block;
					margin-bottom: 4px;
					line-height: 24px;
					font-size: 24px;
					color: #d4d6d9;
				.text
					line-height: 10px;
					font-size: 10px;
					color: #4d555d;
</style>
