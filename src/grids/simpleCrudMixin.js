import Actions from '../actions/Actions.vue'
import SimpleCrudToolbar from './SimpleCrudToolbar.vue'

export default {
  components: {
    Actions,
    SimpleCrudToolbar
  },
  props: {
    actions: [Object, Array],
    actionsComponent: {
      type: String,
      default: 'IconActions'
    },
    title: String,
    items: Array,
    onLoad: Function,
    searchable: Boolean,
    refreshable: Boolean,
    sortable: Boolean,
    headers: Array,
    actionClick: Function,
    isDisabled: Function,
    filterPersistent: Boolean
  },
  data () {
    return {
      loading: false,
      searchValue: null
    }
  },
  created () {
    if (!this.items || !this.items.length) {
      this.loadData()
    }
  },
  computed: {
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
    }
  },
  methods: {
    async loadData () {
      if (!this.onLoad) {
        return
      }
      this.loading = true
      try {
        await this.onLoad()
      } catch (e) {
        this.$dialog.notify.error(e.message)
      }
      this.loading = false
    }
  }
}
