import IconActions from '../actions/IconActions.vue'
import MenuActions from '../actions/MenuActions.vue'
import ButtonActions from '../actions/ButtonActions.vue'
import SimpleCrudToolbar from './SimpleCrudToolbar.vue'

export default {
  components: {
    IconActions,
    ButtonActions,
    MenuActions,
    SimpleCrudToolbar
  },
  props: {
    actions: [Object, Array],
    actionsComponent: {
      type: String,
      default: 'IconActions'
    },
    title: String,
    items: {
      type: Array
    },
    onLoad: Function,
    options: Object,
    searchable: Boolean,
    refreshable: Boolean,
    sortable: Boolean,
    headers: Array,
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
    this.loadData()
  },
  computed: {
    getHeaders () {
      if (!this.actions) {
        return this.headers
      }
      const actionsCount = Object.keys(this.actions).filter(
        item => !this.actions[item].top
      ).length
      return [
        ...this.headers,
        {
          text: '',
          value: 'actions',
          sortable: false,
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
