<template>
  <div class="SimpleCrudTable">
    <v-data-table
      :headers="getHeaders"
      :items="items"
      :mobile-breakpoint="0"
      :loading="loading"
      :search="searchValue"
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

      <template v-if="actions" v-slot:item.actions="{ item }">
        <slot name="actions" :item="item">
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
    </v-data-table>
  </div>
</template>

<script>
import { VDataTable } from 'vuetify/lib'
import serverCrudMixin from './serverCrudMixin'

export default {
  components: {
    VDataTable
  },
  mixins: [
    serverCrudMixin
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
