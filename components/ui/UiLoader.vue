<template>
  <div v-if="show" class="loading-overlay">
    <div class="loading-spinner"></div>
    <span v-if="message" class="loading-message">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  show: boolean
  message?: string
}>(), {
  show: false,
  message: 'Загрузка'
})
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bg-color;
  opacity: .8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  gap: 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid $bg-button-color;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

.loading-placeholder {
  text-align: center;
  padding: 20px;
  color: $calendar-text;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>