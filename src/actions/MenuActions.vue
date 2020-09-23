<template>
  <v-menu offset-y left bottom v-model="menuVisible">
    <template v-slot:activator="{ on }">
      <v-btn
        :text="!!text"
        :icon="!text"
        v-on="on"
        :title="text"
      >
        <v-icon v-if="!text">{{ icon || 'more_vert' }}</v-icon>
        {{ text }}
      </v-btn>
    </template>
    <v-list>
      <template v-for="(action, key) in actions">
        <v-list-item
          v-if="!action.top && getParam(action.visible, item, true)"
          :key="key"
          @click.prevent.stop="onMenuActionClick(action)"
        >
          <v-icon v-if="action.icon" left>
            {{ action.icon }}
          </v-icon>
          <v-list-item-title>
            {{ getParam(action.text, item, true) }}
          </v-list-item-title>
        </v-list-item>
        <v-divider v-if="action.divider" :key="'divider-' + key" />
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import actionsMixin from './actionsMixin'
import { VMenu, VList, VListItem, VListItemTitle, VDivider, VIcon, VBtn } from 'vuetify/lib'
export default {
  components: {
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
    VDivider,
    VIcon,
    VBtn 
  },
  mixins: [actionsMixin],
  props: {
    icon: String,
    text: String
  },
  data () {
    return {
      menuVisible: null
    }
  },
  methods: {
    onMenuActionClick (action) {
      this.menuVisible = false
      return this.onActionClick(action)
    }
  }
}
</script>
