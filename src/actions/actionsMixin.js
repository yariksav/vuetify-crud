export default {
  props: {
    actions: [Object, Array],
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
        console.error('vuetify-crud:', e) // TODO: make global error handler
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
