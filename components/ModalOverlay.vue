<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="modal-close" @click="close">
        <NuxtImg src="/closed.svg" alt="Закрыть" width="23" height="23"/>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

// Управление скроллом тела документа
watch(() => props.show, (visible) => {
  document.body.style.overflow = visible ? 'hidden' : ''
})

// Очищаем при unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  width: 100%;
  max-width: 457px;
  position: relative;
  border-radius: 10px;
  padding: 20px;
  background: $border-color;
  border: 1px solid $bg-task-color;
}

.modal-close {
  position: absolute;
  top: 22px;
  right: 22px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: white;
  width: 23px;
  height: 23px;
}
</style>