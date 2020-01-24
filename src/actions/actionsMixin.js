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
        const res = await action.handler(this.item)
        if (res) {
          this.$emit('changed', { item: this.item, action, res })
        }
      } catch (e) {
        this.$dialog.notify.error(e.message)
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
