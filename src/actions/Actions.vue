<template>
  <div class="flex-grow-0 flex-shrink-0">
    <template v-for="(action, key) in actions">
      <template
        v-if="isVisible(action)"
      >
        <v-btn
          v-if="!action.children"
          :set="isIcon = Boolean(action.type === 'icon' || icon)"
          :key="key"
          :disabled="getParam(action.disabled, item, false)"
          :icon="isIcon"
          :text="!isIcon"
          :title="action.text"
          @click.prevent.stop="onActionClick(action, item)"
        >
          <v-icon v-if="action.icon" :left="!isIcon">
            {{ action.icon }}
          </v-icon>
          <template v-if="!isIcon">
            {{ action.text }}
          </template>
        </v-btn>
        <MenuActions
          v-else
          :key="key"
          :actions="action.children"
          :icon="action.icon"
          :text="action.text"
          :item="item"
          v-on="$listeners"
        />
      </template>
    </template>
  </div>
</template>

<script>
import { VBtn, VIcon } from 'vuetify/lib'
import actionsMixin from './actionsMixin'
import MenuActions from './MenuActions.vue'

export default {
  components: {
     VBtn,
     VIcon,
     MenuActions
  },
  mixins: [actionsMixin],
  props: {
    icon: Boolean,
    text: Boolean,
    name: String
  },
  methods: {
    isVisible (action) {
      // console.log(action.in, this.type, (this.type || action.in) && this.type !== action.in)
      if ((this.name || action.in) && this.name !== action.in) {
        return false
      }
      return this.getParam(action.visible, this.item, true)
    }
  }
}
</script>
