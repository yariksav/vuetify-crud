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
    <div>
      <v-expand-transition>
        <slot v-if="filterMode || filterPersistent" name="filter" />
      </v-expand-transition>
    </div>
  </div>
</template>

<script>

import {
  VToolbar,
  VToolbarTitle,
  VTextField,
  VSpacer,
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
      searchValue: null,
      searchMode: false,
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
