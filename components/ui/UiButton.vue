<template>
  <button
      class="button"
      :class="{ 'button--disabled': disabled }"
      :disabled="disabled"
      @click="$emit('click', $event)"
  >
    <span class="button-content">
      <slot></slot>
      <span v-if="withPlus" class="plus-icon">+</span>
    </span>
  </button>
</template>

<script setup lang="ts">
defineEmits(['click'])

withDefaults(defineProps<{
  withPlus?: boolean
  disabled?: boolean
}>(), {
  withPlus: false,
  disabled: false
})
</script>

<style lang="scss" scoped>
.button {
  --bg-color: #1E6F9F;
  --hover-color: #8284FA;
  --text-color: #F2F2F2;
  --disabled-color: #808080;

  width: 100%;
  height: 52px;
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  padding: 0 16px;
  transition: all 0.2s ease;
  position: relative;

  &:hover:not(.button--disabled) {
    background: var(--hover-color);
  }

  &-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .plus-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 1px solid currentColor;
    border-radius: 50%;
    font-size: 0.8em;
    margin-left: 8px;
  }

  &--disabled {
    background: var(--disabled-color);
    cursor: not-allowed;
    opacity: 0.7;
  }
}
</style>