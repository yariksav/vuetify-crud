<template>
  <div class="SimpleCrudTable">
    <v-data-table
      :headers="getHeaders"
      :items="items"
      :mobile-breakpoint="0"
      class="elevation-1"
      :loading="loading"
      :search="searchValue"
      locale="ru-RU"
      v-bind="options"
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
          <ButtonActions slot="actions" :actions="actions" @changed="loadData" />
          <slot slot="filter" name="filter" />
        </SimpleCrudToolbar>
        <slot name="header-bottom" />
      </template>
      <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
      <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
        <slot :name="slot" v-bind="scope" />
      </template>

      <template v-if="actions" v-slot:item.actions="{ item }">
        <slot name="actions" :item="item">
          <div class="actions" :class="{ 'only-on-hover': true }">
            <component :is="actionsComponent" slot="actions" :actions="actions" :item="item" @changed="loadData" />
          </div>
        </slot>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import simpleCrudMixin from './simpleCrudMixin'
import { VDataTable } from 'vuetify/lib'

export default {
  components: {
    VDataTable
  },
  mixins: [
    simpleCrudMixin
  ]
}
</script>

<style lang="scss">
  .SimpleCrudTable {
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
