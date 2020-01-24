
<template>
  <div>
    <template v-for="(action, key) in actions">
      <v-btn
        v-if="action.top && getParam(action.visible, null, true)"
        :key="key"
        :disabled="getParam(action.disabled, null, false)"
        text
        @click="onActionClick(action, item)"
      >
        <v-icon v-if="action.icon" left>
          {{ action.icon }}
        </v-icon>
        {{ action.text }}
      </v-btn>
    </template>
  </div>
</template>

<script>
import actionsMixin from './actionsMixin'
import { VIcon, VBtn } from 'vuetify/lib'
export default {
  components: {
    VIcon,
    VBtn 
  },
  mixins: [actionsMixin]
}
</script>
