<template>
	<div class="ratingSelect">
		<div class="rating-type border-1px">
			<span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">
				{{desc.all}}<span class="count">{{ratings.length}}</span>
			</span>
			<span class="block positive" :class="{'active':selectType===0}" @click="select(0,$event)">
				{{desc.positive}}<span class="count">{{positive.length}}</span>
			</span>
			<span class="block negative" :class="{'active':selectType===1}" @click="select(1,$event)">
				{{desc.negative}}<span class="count">{{negative.length}}</span>
			</span>
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	const POSITION = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default{
		props: {
			ratings: {
				type: Array,
				default () {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default () {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					};
				}
			}
		},
		methods: {
			select (type, event) {
				if (!event._constructed) {
					return;
				}
				this.$emit('select', type);
			},
			toggleContent (event) {
				if (!event._constructed) {
					return;
				}
				this.$emit('toggle')
			}
		},
		computed: {
			positive () {
				return this.ratings.filter((rating) =>rating.rateType === POSITION); //ES6简写
			},
			negative () {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				});
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.ratingSelect
		.rating-type
			padding: 18px 0;
			margin: 0 18px;
			font-size: 0;
			border-1px(rgba(7, 17, 27, 0.1))
			.block
				display: inline-block;
				padding: 8px 12px;
				margin-right: 8px;
				line-height: 16px;
				border-radius: 1px;
				font-size: 12px;
				color: #4d555d;
				&.active
					color: #FFF
				&.positive
					background: rgba(0, 160, 220, 0.2);
					&.active
						background: #00a0dc;
				&.negative
					background: rgba(77, 85, 93, 0.2);
					&.active
						background: #4d555d;
				.count
					margin-left: 2px;
					font-size: 8px;
		.switch
			padding: 12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
			color: #93999f;
			font-size: 0;
			&.on
				.icon-check_circle
					color: #00c850;
			.icon-check_circle
				display: inline-block;
				vertical-align: top;
				margin-right: 4px;
				font-size: 24px;
			.text
				display: inline-block;
				vertical-align: top;
				font-size: 12px;
</style>
