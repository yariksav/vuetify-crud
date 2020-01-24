<template>
  <div class="flex-grow-0 flex-shrink-0">
    <template v-for="(action, key) in actions">
      <v-btn
        v-if="!action.top && getParam(action.visible, item, true)"
        :key="key"
        :disabled="getParam(action.disabled, item, false)"
        icon
        :title="action.text"
        @click="onActionClick(action, item)"
      >
        <v-icon>{{ action.icon }}</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
import actionsMixin from './actionsMixin'
import { VBtn, VIcon } from 'vuetify/lib'
export default {
  components: {
     VBtn,
     VIcon
  },
  mixins: [actionsMixin]
}
</script>
