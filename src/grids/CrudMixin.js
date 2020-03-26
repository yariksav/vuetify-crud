import { debounce } from 'lodash'

export default {
  inheritAttrs: false,
  props: {
    actions: [Object, Array],
    actionsComponent: {
      type: String,
      default: 'IconActions'
    },
    actionClick: Function,
    filter: Object,
    filterPersistent: Boolean,
    headers: Array,
    isServer: Boolean,
    items: Array,
    paginationTotalVisible: {
      type: Number,
      default: 7
    },
    itemsPerPageOptions: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    onLoad: Function,
    onError: Function,
    options: Object,
    searchable: Boolean,
    sortable: Boolean,
    refreshable: Boolean,
    title: String,
    total: Number
  },
  data () {
    return {
      page: 1,
      limit: this.itemsPerPageOptions[0],
      sortBy: null,
      sortDesc: false,
      loading: false,
      searchValue: null
    }
  },
  created () {
    if (!this.items || !this.items.length) {
      this.loadData()
    }
    if (this.isServer) {
      this.$watch('page', async () => {
        await this.loadData()
        if (this.$refs.grid) {
          this.$vuetify.goTo(this.$refs.grid)
        }
      })
      this.$watch('limit', this.loadData)
      this.$watch('searchValue', debounce(this.goToFirstPageAndLoadData, 500))
      this.$watch('sortBy', this.loadData)
      this.$watch('filter', this.goToFirstPageAndLoadData, { deep: true })
    }
  },
  computed: {
    pageCount () {
      const total = this.total || (this.items && this.items.length) || 0
      return Math.ceil(total / this.limit)
    },
    computedDataItemsPerPageOptions () {
      return this.itemsPerPageOptions.map(option => ({
        text: option,
        value: option
      }))
    },
    bindFields () {
      const bind = { ...this.options }
      if (this.isServer ) {
        bind['server-items-length'] = this.total
        bind['disable-pagination'] = true
        bind['disable-filtering'] = true
      } else {
        bind.search = this.searchValue
      }

      if (!this.isIterator) {
        bind.headers = this.getHeaders
        bind['mobile-breakpoint'] = 0
      }
      return bind
    },
    getHeaders () {
      if (!this.actions) {
        return this.headers
      }
      const actionsCount = Object.keys(this.actions).filter(
        item => !this.actions[item].in
      ).length
      return [
        ...this.headers,
        {
          text: '',
          value: 'actions',
          sortable: false,
          align: 'right',
          width: actionsCount * 58
        }
      ]
    },
    loadParams () {
      if (this.isServer) {
        return {
          page: this.page,
          limit: this.limit,
          search: this.searchValue,
          sortBy: Array.isArray(this.sortBy) ? this.sortBy[0] : this.sortBy,
          sortDirection: (Array.isArray(this.sortDesc) ? this.sortDesc[0] : this.sortDesc) ? 'DESC' : 'ASC',
          ...this.filter
        }
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
        await this.onLoad(this.loadParams)
      } catch (e) {
        console.error(e)
        if (this.onError) {
          this.onError(e.message)
        } else if (this.$dialog) {
          this.$dialog.notify.error(e.message)
        }
      }
      this.loading = false
    },
    async goToFirstPageAndLoadData () {
      this.page = 1
      return this.loadData()
    }
  }
}
