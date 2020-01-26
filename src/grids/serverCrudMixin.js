import { debounce } from 'lodash'
import simpleCrudMixin from './simpleCrudMixin'

export default {
  mixins: [
    simpleCrudMixin
  ],
  props: {
    itemsPerPageOptions: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    total: Number,
    filter: Object
  },
  data () {
    return {
      page: 1,
      sortBy: null,
      sortDesc: false,
      limit: this.itemsPerPageOptions[0],
      footerOptions: {
        itemsPerPageOptions: this.itemsPerPageOptions
      }
    }
  },
  watch: {
    page: 'loadData',
    limit: 'loadData',
    searchValue: 'debouncedLoadData',
    sortBy: 'loadData',
    sortDesc: 'loadData',
    filter: {
      deep: true,
      handler () {
        this.page = 1
        this.loadData()
      }
    }
  },
  methods: {
    async loadData () {
      if (!this.onLoad) {
        return
      }
      this.loading = true
      try {
        await this.onLoad({
          page: this.page,
          limit: this.limit,
          search: this.searchValue,
          sortBy: Array.isArray(this.sortBy) ? this.sortBy[0] : this.sortBy,
          sortDirection: (Array.isArray(this.sortDesc) ? this.sortDesc[0] : this.sortDesc) ? 'DESC' : 'ASC',
          ...this.filter
        })
      } catch (e) {
        this.$dialog.notify.error(e.message)
      }
      this.loading = false
    },
    debouncedLoadData: debounce(function () {
      this.page = 1
      return this.loadData()
    }, 500)
  }
}