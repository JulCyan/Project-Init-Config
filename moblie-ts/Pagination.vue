<style scoped lang="less">
.pagination {
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 40px;
	background: #fff;
	font-size: 14px;
	border-radius: 8px;
	.prev,
	.next {
		display: flex;
		align-items: center;
		color: #666;
		cursor: pointer;

		.prev-icon,
		.next-icon {
			width: 16px;
			height: 16px;
			background-size: 100% 100%;
		}

		&.none {
			color: #ccc !important;

			.prev-icon {
				background-image: url(../assets/image/@2x/prev@2x.png) !important;
				transform: rotate(0deg) !important;
			}

			.next-icon {
				background-image: url(../assets/image/@2x/prev@2x.png) !important;
				transform: rotate(180deg) !important;
			}
		}
	}

	.prev {
		.prev-icon {
			background-image: url(../assets/image/@2x/next@2x.png);
			transform: rotate(180deg);
		}
	}

	.next {
		.next-icon {
			background-image: url(../assets/image/@2x/next@2x.png);
		}
	}
}
</style>

<template>
  <div class="pagination" v-if="maxPage > 1">
    <div :class="['prev', syncCurrentPage <= 1 ? 'none' : '']" @click="prev">
      <i class="prev-icon"></i>上一页
    </div>
    <div class="current">第{{ syncCurrentPage }}页</div>
    <div :class="['next', syncCurrentPage >= maxPage ? 'none' : '']" @click="next">
      下一页
      <i class="next-icon"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch, Emit } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
	static readonly displayName: string = 'Pagination'
	@Prop({ type: Number, default: 1 }) private readonly maxPage!: number
	@Prop({ type: Number, default: 1 }) private readonly minPage!: number
	@PropSync('currentPage', { type: Number, default: 1 }) private syncCurrentPage!: number

	private prev() {
		this.syncCurrentPage > 1 && this.syncCurrentPage--
	}
	private next() {
		this.syncCurrentPage < this.maxPage && this.syncCurrentPage++
	}

	@Watch('syncCurrentPage')
	pageChange(newVal: number, oldVal: number) {
		this.change()
	}
	
	@Emit()
	change() {
		return this.syncCurrentPage
	}
	private created() {}
}
</script>