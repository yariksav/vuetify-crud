<template>
  <v-card class="ServerCrudIterator">
    <v-data-iterator
      :items="items"
      :loading="loading"
      :server-items-length="total"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :items-per-page.sync="limit"
      :page.sync="page"
      :footer-props.sync="footerOptions"
      :disable-sort="!sortable"
      disable-pagination
      disable-filtering
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-slot:top>
        <SimpleCrudToolbar
          :title="title"
          :actions="actions"
          :filter-persistent="filterPersistent"
          :searchable="searchable"
          :refreshable="refreshable"
          :search.sync="searchValue"
          @refresh="loadData"
        >
          <slot name="top" />
          <Actions
            slot="actions"
            name="toolbar"
            :actions="actions"
            :handler="actionClick"
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
        <slot v-if="actions" name="actions" :item="item">
          <div class="actions" :class="{ 'only-on-hover': true }">
            <Actions
              slot="actions"
              icon
              :actions="actions"
              :handler="actionClick"
              :item="item"
              @changed="loadData"
            />
          </div>
        </slot>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
import { VDataIterator, VCard } from 'vuetify/lib'
import serverCrudMixin from './serverCrudMixin'

export default {
  components: {
    VDataIterator,
    VCard
  },
  mixins: [
    serverCrudMixin
  ]
}
</script>
