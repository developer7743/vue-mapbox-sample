<template>
  <div
    v-if="visible"
    class="map-context-menu"
    :style="contextMenuPosition"
  >
    <div
      class="map-context-menu-option"
      v-for="option in options"
      :key="option.type"
      @click="onOptionClick(option)"
    >
      {{ option.name }}
    </div>
  </div>
</template>

<script>
  import MAP_CONTEXT_OPTIONS from '../../constants/map/mapContextOptions';
  import MAP_CONTEXT_MODES from '../../constants/map/contextMenuModeTypes';

  export default {
    name: 'MapContextMenu',
    props: {
      position: Object,
      visible: {
        type: Boolean,
        default: false,
      },
      mode: {
        type: String,
        default: MAP_CONTEXT_MODES.MAP,
      },
      markerType: {
        type: Number,
        default: -1,
      },
    },
    computed: {
      options() {
        let options = MAP_CONTEXT_OPTIONS[this.mode];

        if (this.mode === MAP_CONTEXT_MODES.POINT) {
          options = options.filter(option => option.type !== this.markerType);
        }

        return options;
      },
      contextMenuPosition() {
        const { x = 0, y = 0 } = this.position || {};
        return {
          top: `${y}px`,
          left: `${x}px`,
        };
      },
    },
    methods: {
      onOptionClick(option) {
        this.$emit('click', option.type);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .map-context-menu {
    position: absolute;
    background: #ffffff;
    border-radius: 4px;
  }

  .map-context-menu-option {
    padding: 5px 10px;
    color: #4F4F4F;
    cursor: pointer;

    &:hover {
      background: #E0E0E0;
    }
  }
</style>