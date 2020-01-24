<template>
  <div class="SimpleCrudTable">
    <v-data-table
      :headers="getHeaders"
      :items="items"
      :server-items-length="total"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :items-per-page.sync="limit"
      :mobile-breakpoint="0"
      class="elevation-1"
      :loading="loading"
      :search="searchValue"
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
import { debounce } from 'lodash'
import { VDataTable } from 'vuetify/lib'
import simpleCrudMixin from './simpleCrudMixin'

export default {
  components: {
    VDataTable
  },
  mixins: [
    simpleCrudMixin
  ],
  props: {
    itemsPerPageOptions: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    total: Number,
    filter: Object
  },
  data () {
    return {
      page: 1,
      sortBy: null,
      sortDesc: false,
      limit: this.itemsPerPageOptions[0],
      footerOptions: {
        itemsPerPageOptions: this.itemsPerPageOptions
      }
    }
  },
  watch: {
    page: 'loadData',
    limit: 'loadData',
    searchValue: 'debouncedLoadData',
    sortBy: 'loadData',
    sortDesc: 'loadData',
    filter: {
      deep: true,
      handler () {
        this.page = 1
        this.loadData()
      }
    }
  },
  methods: {
    async loadData () {
      if (!this.onLoad) {
        return
      }
      this.loading = true
      try {
        await this.onLoad({
          page: this.page,
          limit: this.limit,
          search: this.searchValue,
          sortBy: Array.isArray(this.sortBy) ? this.sortBy[0] : this.sortBy,
          sortDirection: (Array.isArray(this.sortDesc) ? this.sortDesc[0] : this.sortDesc) ? 'DESC' : 'ASC',
          ...this.filter
        })
      } catch (e) {
        this.$dialog.notify.error(e.message)
      }
      this.loading = false
    },
    debouncedLoadData: debounce(function () {
      this.page = 1
      return this.loadData()
    }, 500)
  }
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
