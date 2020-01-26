<template>
  <div class="SimpleCrudTable">
    <v-data-iterator
      :items="items"
      :server-items-length="total"
      :items-per-page.sync="limit"
      :footer-props.sync="footerOptions"
      :loading="loading"
      :page.sync="page"
      :disable-sort="!sortable"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      disable-pagination
      disable-filtering
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-slot:header>
        <SimpleCrudToolbar
          :title="title"
          :actions="actions"
          :filter-persistent="filterPersistent"
          :searchable="searchable"
          :refreshable="refreshable"
          :search.sync="searchValue"
          @refresh="loadData"
        >
          <Actions
            slot="actions"
            name="toolbar"
            :actions="actions"
            @changed="loadData"
          />
          <slot slot="filter" name="filter" />
          <slot slot="title" name="title" />
        </SimpleCrudToolbar>
        <slot name="header-bottom" />
      </template>

      <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
      <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
        <slot :name="slot" v-bind="scope" />
      </template>

      <template v-slot:item="{ item }">
        <slot name="item" :item="item" />
        <slot name="actions" :item="item">
          <div class="actions" :class="{ 'only-on-hover': true }">
            <Actions
              slot="actions"
              icon
              :actions="actions"
              :item="item"
              @changed="loadData"
            />
          </div>
        </slot>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import { VDataIterator } from 'vuetify/lib'
import serverCrudMixin from './serverCrudMixin'

export default {
  components: {
    VDataIterator
  },
  mixins: [
    serverCrudMixin
  ]
}
</script>
