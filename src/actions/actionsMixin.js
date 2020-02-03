export default {
  props: {
    actions: [Object, Array],
    item: Object
  },
  methods: {
    async onActionClick (action) {
      if (typeof action.handler !== 'function') {
        return
      }
      try {
        const response = await action.handler(this.item)
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
