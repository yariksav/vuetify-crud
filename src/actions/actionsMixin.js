export default {
  props: {
    actions: [Object, Array],
    onError: Function,
    handler: Function,
    item: Object
  },
  methods: {
    async onActionClick (action) {
      const handler = action.handler || this.handler
      if (typeof handler !== 'function') {
        return
      }
      try {
        const response = await handler(this.item, action)
        if (response) {
          this.$emit('changed', { item: this.item, action, response })
        }
      } catch (e) {
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
