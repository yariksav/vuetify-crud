<template>
  <v-card
    flat
    v-bind="$attrs"
    class="CrudToolbar"
  >
    <CrudToolbar
      :title="title"
      :actions="actions"
      :filter-persistent="filterPersistent"
      :searchable="searchable"
      :refreshable="refreshable"
      :search.sync="searchValue"
      v-bind="$attrs"
      @refresh="loadData"
    >
      <template slot="actions">
        <slot name="toolbar" />
        <Actions
          slot="actions"
          name="toolbar"
          :actions="actions"
          @changed="loadData"
        />
      </template>
      <slot slot="filter" name="filter" />
      <slot slot="title" name="title" />
    </CrudToolbar>
    <v-card-text>
      <v-treeview
        class="m-groups-preview "
        :items="items"
        v-bind="$attrs"
        dense
        :active.sync="activeItems"
        activatable
        :search="searchValue"
        return-object
      >
        <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
        <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
        <template v-slot:append="{ item }">
          <Actions
            slot="append"
            icon
            :actions="actions"
            :item="item"
            @changed="loadData"
          />
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
import CrudMixin from './CrudMixin'
import Actions from '../actions/Actions.vue'
import CrudToolbar from './CrudToolbar.vue'

import {
  VTreeview,
  VCard,
  VCardText
} from 'vuetify/lib'

export default {
  components: {
    VTreeview,
    VCard,
    VCardText,
    Actions,
    CrudToolbar
  },
  mixins: [
    CrudMixin
  ],
  props: {
    selected: Object
  },
  data () {
    return {
      selectedItem: this.selected,
      activeItems: []
    }
  },
  watch: {
    activeItems (val) {
      if (!val.length && this.selectedItem) {
        this.activeItems.push(this.selectedItem)
      } else {
        this.selectedItem = val[0]
      }
    },
    selectedItem () {
      this.$emit('update:selected', this.selectedItem)
    }
  }
}
</script>
<style lang="scss">
  .m-groups-preview {
    ::v-deep .v-treeview-node {
      border-top: 1px solid var(--v-secondary-base);
      &:nth-child(2n+1) {
        .v-treeview-node__root:nth-child(2n+1) {
          background-color: #F0F6FC;
        }
      }
    }
  }
  .CrudToolbar .v-treeview-node__label {
    cursor: pointer;
  }
</style>