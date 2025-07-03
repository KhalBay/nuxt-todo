<template>
  <button
      class="button"
      :class="{ 'button--disabled': disabled }"
      :disabled="disabled"
      @click="$emit('click', $event)"
  >
    <span class="button-content">
      <slot></slot>
      <NuxtImg v-if="withPlus" class="plus-icon" src="./plus.svg"/>
    </span>
  </button>
</template>

<script setup lang="ts">
import {Popover} from "v-calendar";

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
  width: 100%;
  height: 52px;
  background: $bg-button-color;
  color: $text-color;
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  padding: 0 16px;
  transition: all 0.2s ease;
  position: relative;

  .plus-icon {
    width: 16px;
    height: 16px;
  }
  &:hover:not(.button--disabled) {
    background: $hover-color;
  }
  &-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  &--disabled {
    background: $disabled-color;
    cursor: not-allowed;
    opacity: 0.7;
  }
}
</style>