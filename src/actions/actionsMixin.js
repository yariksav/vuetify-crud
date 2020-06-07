export default {
  props: {
    actions: [Object, Array],
    onError: Function,
    handler: Function,
    item: Object
  },
  data () {
    return {
      loadingState: {}
    }
  },
  methods: {
    async onActionClick (action, _, key) {
      action.loading && this.$set(this.loadingState, key, true)
      const handler = action.handler || this.handler
      if (typeof handler !== 'function') {
        return
      }
      try {
        const response = await handler(this.item, action)
        if (response) {
          this.$emit('changed', { item: this.item, action, response })
        }
        action.loading && this.$set(this.loadingState, key, false)
      } catch (e) {
        action.loading && this.$set(this.loadingState, key, false)
        if (this.onError) {
          this.onError(e)
        } else {
          throw e
        }
      }
    },
    getParam (param, item, def) {
      if (param === undefined) {
        return def
      }
      if (typeof param === 'function') {
        return param(item)
      }
      return param
    }
  }
}
