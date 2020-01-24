<template>
  <v-card v-bind="$attrs" class="SimpleGrudTree pb-4">
    <SimpleCrudToolbar
      :title="title"
      :actions="actions"
      :filter-persistent="filterPersistent"
      :searchable="searchable"
      :refreshable="refreshable"
      :search.sync="searchValue"
      @refresh="loadData"
    >
      <template slot="actions">
        <slot name="toolbar" />
        <ButtonActions :actions="actions" @changed="loadData" />
      </template>
      <slot slot="filter" name="filter" />
    </SimpleCrudToolbar>
    <v-card-text>
      <v-treeview
        :items="items"
        v-bind="$attrs"
        dense
        item-key="id"
        item-text="name"
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
          <slot name="actions" :item="item">
            <MenuActions :actions="actions" :item="item" @changed="loadData" />
          </slot>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
import simpleCrudMixin from './simpleCrudMixin'

export default {
  mixins: [
    simpleCrudMixin
  ],
  data () {
    return {
      activeItems: []
    }
  }
}
</script>