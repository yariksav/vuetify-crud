<template>
  <div class="CrudGrid pb-2">
    <CrudToolbar
      :title="title"
      :actions="actions"
      :filter-persistent="filterPersistent"
      :searchable="searchable"
      :refreshable="refreshable"
      :search.sync="searchValue"
      @refresh="loadData"
      slot="header"
    >
      <slot name="title" />
      <Actions
        slot="actions"
        name="toolbar"
        :actions="actions"
        :handler="actionClick"
        :on-error="onError"
        @changed="loadData"
      />
      <slot slot="filter" name="filter" />
      <!-- <slot slot="title" name="title" /> -->
    </CrudToolbar>
    <slot name="header-bottom" />
    <component
      ref="grid"
      :is="componentVuetify"
      :items="items"
      :loading="loading"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :items-per-page.sync="limit"
      :page.sync="page"
      :disable-sort="!sortable"
      hide-default-footer
      v-bind="bindFields"
      v-on="$listeners"
    >
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
              :on-error="onError"
              :handler="actionClick"
              :item="item"
              @changed="loadData"
            />
          </div>
        </slot>
      </template>
    </component>
    <div v-if="pageCount > 1" class="d-flex">
      <v-pagination
        class="justify-center"
        v-model="page"
        :length="pageCount"
        :total-visible="paginationTotalVisible"
      />
      <!-- <v-select TODO:
        class="justify-end"
        :style="{
          'min-width': '60px',
          'max-width': '60px'
        }"
        v-model="limit"
        :items="computedDataItemsPerPageOptions"
        hide-details
        dense
        auto
      /> -->
    </div>
  </div>
</template>

<script>
import {
  VPagination,
  VDataTable,
  VDataIterator,
  VSelect
} from 'vuetify/lib'
import Actions from '../actions/Actions.vue'
import CrudToolbar from './CrudToolbar.vue'
import CrudMixin from './CrudMixin'

export default {
  mixins: [
    CrudMixin
  ],
  components: {
    Actions,
    CrudToolbar,
    VSelect,
    VPagination
  },
  props: {
    isIterator: Boolean
  },
  computed: {
    componentVuetify () {
      return this.isIterator ? VDataIterator : VDataTable
    }
  }
}
</script>
<style lang="scss">
  .CrudGrid {
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