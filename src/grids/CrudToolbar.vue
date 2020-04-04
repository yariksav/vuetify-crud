<template>
  <div>
    <v-toolbar flat>
      <slot name="title">
        <v-toolbar-title class="headline">
          {{ title }}
        </v-toolbar-title>
      </slot>
      <v-spacer />
      <v-text-field
        v-if="searchMode"
        ref="search"
        v-model="searchValue"
        clearable
        class="mx-4"
        hide-details
        label="Search"
        prepend-inner-icon="search"
        @blur="hideSearch"
        @keyup.esc.stop="clearSearch"
      />
      <template v-if="!searchMode">
        <slot name="actions" />
        <v-btn v-if="refreshable" icon @click="$emit('refresh')">
          <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn v-if="searchable" icon @click="showSearch">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn v-if="$slots.filter && !filterPersistent" icon @click="filterMode = !filterMode">
          <v-icon>filter_list</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-expand-transition>
      <div v-if="filterMode || filterPersistent">
        <v-sheet>
          <slot name="filter" />
        </v-sheet>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>

import {
  VToolbar,
  VToolbarTitle,
  VTextField,
  VSpacer,
  VSheet,
  VCard,
  VBtn,
  VExpandTransition,
  VIcon
} from 'vuetify/lib'

export default {
  components: {
    VToolbar,
    VToolbarTitle,
    VTextField,
    VSpacer,
    VSheet,
    VCard,
    VBtn,
    VExpandTransition,
    VIcon
  },
  props: {
    actions: [Object, Array],
    filterPersistent: Boolean,
    refreshable: Boolean,
    search: String,
    searchable: Boolean,
    title: String
  },
  data () {
    return {
      searchValue: this.search,
      searchMode: Boolean(this.search),
      filterMode: false
    }
  },
  watch: {
    searchValue (val) {
      this.$emit('update:search', val)
    }
  },
  methods: {
    clearSearch () {
      this.searchValue = ''
      this.searchMode = false
    },
    hideSearch () {
      if (!this.searchValue) {
        this.searchMode = false
      }
    },
    showSearch () {
      this.searchMode = true
      setTimeout(() => {
        this.$refs.search.focus()
      }, 10)
    }
  }
}
</script>
