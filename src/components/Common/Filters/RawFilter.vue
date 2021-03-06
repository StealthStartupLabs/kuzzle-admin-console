<template>
  <form class="RawFilter">
    <div v-if="currentFilter.basic" class="card-panel blue lighten-3">
      A Basic filter is currently active. This shows your basic filter as raw
      filter. If you modify this raw filter it will not change the basic filter
      view and will reset this raw filter to the original content of the basic
      filter.
    </div>
    <json-editor
      id="rawsearch"
      ref="jsoneditor"
      myclass="pre_ace"
      :content="filters.raw"
      :refresh-ace="refreshAce"
    />
    <div class="row card-action">
      <button
        v-if="actionButtonsVisible"
        type="submit"
        class="RawFilter-submitBtn btn primary waves-effect waves-light"
        @click.prevent="submitSearch"
      >
        {{ submitButtonLabel }}
      </button>
      <button
        v-if="actionButtonsVisible"
        class="btn-flat waves-effect waves-light"
        @click="resetSearch"
      >
        Reset
      </button>
      <span v-if="jsonInvalid" class="error">Your JSON is not valid</span>
    </div>
  </form>
</template>

<script>
import JsonEditor from '../../Common/JsonEditor'
import * as filterManager from '../../../services/filterManager'

export default {
  components: {
    JsonEditor
  },
  props: {
    rawFilter: {
      type: Object,
      default() {
        return {}
      }
    },
    // TODO
    formatFromBasicSearch: Function,
    submitButtonLabel: {
      type: String,
      required: false,
      default: 'search'
    },
    actionButtonsVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    sortingEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
    currentFilter: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    refreshAce: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filters: {
        raw: {}
      },
      jsonInvalid: false
    }
  },
  watch: {
    rawFilter: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.filters.raw = newValue
        } else {
          this.filters.raw = {}
        }
      }
    },
    currentFilter: {
      immediate: true,
      handler() {
        this.$set(
          this.filters,
          'raw',
          filterManager.toSearchQuery(this.currentFilter)
        )
        if (this.currentFilter.raw && this.currentFilter.raw.sort) {
          this.$set(this.filters.raw, 'sort', this.currentFilter.raw.sort)
        }
      }
    }
  },
  mounted() {
    this.filters.raw = filterManager.toSearchQuery(this.currentFilter)
    if (this.currentFilter.raw && this.currentFilter.raw.sort) {
      this.$set(this.filters.raw, 'sort', this.currentFilter.raw.sort)
    }
  },
  methods: {
    submitSearch() {
      let json = this.$refs.jsoneditor.getJson()

      if (json === null) {
        this.jsonInvalid = true
        return
      }

      this.jsonInvalid = false
      this.filters.raw = json

      this.$emit('update-filter', this.filters.raw)
    },
    resetSearch() {
      this.filters.raw = null
      this.$emit('update-filter', this.filters.raw)
    }
  }
}
</script>

<style lang="scss" scoped>
#rawsearch.pre_ace {
  height: 100px;
}
</style>
