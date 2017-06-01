<template>
	<div class="ratings" ref="ratings">
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingSelect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"
						  @select="selectRating" @toggle="toggleContent"></ratingSelect>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import star from 'components/star/star'
	import split from 'components/split/split'
	import ratingSelect from 'components/ratingselect/ratingselect'

	let ERR_OK = 0;
	const ALL = 2;

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			}
		},
		created () {
			this.$http.get('api/ratings').then((response) => {
				let res = response.body;
				if (res.errno === ERR_OK) {
					this.ratings = res.data;
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.ratings, {
							click: true
						});
					});
				}
			})
		},
		methods: {
			selectRating (type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			toggleContent () {
				this.onlyContent = !this.onlyContent
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			}
		},
		components: {
			star,
			split,
			ratingSelect
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ratings
		position: absolute
		top: 174px
		left: 0
		bottom: 0
		width: 100%
		.overview
			display: flex;
			padding: 18px 0;
			.overview-left
				flex: 0 0 137px;
				padding: 6px 0;
				width: 137px;
				border-right: 1px solid rgba(7, 17, 27, 0.1);
				text-align: center;
				.score
					margin-bottom: 6px;
					line-height: 28px;
					font-size: 24px;
					color: #f90;
				.title
					margin-bottom: 8px;
					line-height: 12px;
					font-size: 12px;
					color: #07111b;
				.rank
					line-height: 10px;
					font-size: 10px;
					color: #93999f;
			.overview-right
				flex: 1;
				padding: 6px 0 6px 24px;
				.score-wrapper
					margin-bottom: 8px;
					font-size: 0;
					.star
						display: inline-block;
						margin: 0 12px;
						vertical-align: top;
					.title
						display: inline-block;
						line-height: 18px;
						vertical-align: top;
						font-size: 12px;
						color: #07111b;
					.score
						display: inline-block;
						line-height: 18px;
						vertical-align: top;
						font-size: 12px;
						color: #f90;
				.delivery-wrapper
					font-size: 0;
					.title
						line-height: 18px;
						font-size: 12px;
						color: #07111b;
					.delivery
						margin-left: 12px;
						font-size: 12px;
						color: #93999f;
</style>
