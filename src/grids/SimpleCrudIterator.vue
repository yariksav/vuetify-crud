<template>
  <v-card flat class="SimpleCrudIterator">
    <v-data-iterator
      :headers="getHeaders"
      :items="items"
      :loading="loading"
      :search="searchValue"
      v-bind="options"
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
          <slot name="top" />
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

      <template v-slot:default="{ item }">
        <slot name="default" :item="item" />
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
  </v-card>
</template>

<script>
import simpleCrudMixin from './simpleCrudMixin'
import { VDataIterator, VCard } from 'vuetify/lib'

export default {
  components: {
    VDataIterator,
    VCard
  },
  mixins: [
    simpleCrudMixin
  ]
}
</script>

<style lang="scss">
  .SimpleCrudIterator {
    .v-data-table {
      table {
        table-layout: fixed;
        width: 100%;
        td.disabled {
          opacity: 0.5
        }
        .actions.only-on-hover {
          opacity: 0.1;
        }
        tr:hover {
          .actions.only-on-hover  {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
