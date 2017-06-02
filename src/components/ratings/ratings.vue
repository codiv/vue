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
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="rating in ratings" v-show="onshow(rating.rateType,rating.text)">
						<div class="avatar"><img :src="rating.avatar" width="28" height="28"></div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery">{{rating.deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend">
								<span class="icon-thumb_up"></span>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatData}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import {formatDate} from 'common/js/date.js'
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
			onshow (type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType
				}
			},
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
		filters: {
			formatData (time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm');
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
	@import "../../common/stylus/mixin.styl"
	.ratings
		position: absolute
		top: 174px
		left: 0
		bottom: 0
		width: 100%
		overflow: hidden
		.overview
			display: flex;
			padding: 18px 0;
			.overview-left
				flex: 0 0 137px;
				padding: 6px 0;
				width: 137px;
				border-right: 1px solid rgba(7, 17, 27, 0.1);
				text-align: center;
				@media only screen and (max-width: 320px )
					flex: 0 0 120px;
					width: 120px;
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
				@media only screen and (max-width: 320px )
					padding-left: 6px;
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
		.rating-wrapper
			padding: 0 18px;
			.rating-item
				display: flex;
				padding: 18px 0;
				position: relative;
				border-1px(rgba(7, 17, 27, 0.1))
				.avatar
					flex: 0 0 28px;
					width: 28px;
					margin-right: 12px;
					img
						border-radius: 50%;
				.content
					flex: 1
					position: relative
					.name
						margin-bottom: 4px;
						line-height: 12px;
						font-size: 10px;
						color: #07111b;
					.star-wrapper
						margin-bottom: 6px;
						font-size: 0;
						.star
							display: inline-block;
							margin-right: 6px;
							vertical-align: top;
						.delivery
							display: inline-block;
							vertical-align: top;
							line-height: 12px;
							font-size: 10px;
							color: #93999f;
					.text
						margin-bottom: 8px;
						line-height: 18px;
						color: #07111b;
						font-size: 12px;
					.recommend
						line-height: 16px;
						font-size: 0;
						.icon-thumb_up, .item
							display: inline-block;
							margin: 0 8px 4px 0;
							font-size: 9px;
						.icon-thumb_up
							color: #00a0dc;
						.item
							padding: 0 6px;
							border: 1px solid rgba(7, 17, 27, 0.1);
							border-radius: 1px;
							color: #93999f;
							background: #fff;
				.time
					position: absolute;
					top: 0;
					right: 0;
					line-height: 12px;
					font-size: 10px;
					color: #93999f;
</style>
