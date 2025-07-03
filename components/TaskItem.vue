<template>
  <div class="task-block" @click="navigateToTask">
    <nuxt-img
        class="status"
        :src="task.isDone ? './checked.svg' : './check.svg'"
        @click.stop="$emit('toggle')"
    />
    <div class="info">
      <div class="info-block">
        <div class="info-title" :class="{'closed': task.isDone}">{{ task.title }}</div>
        <div class="info-date">
          <div>
            Дата создания: <p>{{ taskStore.formatDate(task.createdAt) }}</p>
          </div>
          <div>
            Дата окончания: <p>{{ taskStore.formatDate(task.endDate) }}</p>
          </div>
        </div>
      </div>
      <div
          class="description"
          :class="{'closed': task.isDone}"
      >
        {{ task.description }}
      </div>
    </div>
    <div class="task-block-buttons">
      <button
          class="button-ico"
          @click.stop="editTask"
      >
        <nuxt-img src="./edit.svg"/>
      </button>
      <button
          class="button-ico"
          @click.stop="deleteTask"
      >
        <nuxt-img src="./trash.svg"/>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/task'

const props = defineProps<{
  task: Task
}>()

const taskStore = useTaskStore()

const emit = defineEmits(['edit', 'delete'])
const editTask = () => emit('edit', props.task.id)
const deleteTask = () => emit('delete', props.task.id)

const navigateToTask = () => {
  navigateTo(`/tasks/${props.task.id}`)
}
</script>

<style lang="scss" scoped>
.task-block {
  background: $bg-task-color;
  border-radius: 8px;
  border: 1px solid $border-color;
  padding: 16px;
  cursor: pointer;
  display: flex;
  gap: 12px;

  .status {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    font-weight: 700;
    font-size: 20px;
    // Это может конечно ошибка но в дизайне высота блока 101, при этом блок текста не совсем корретно вписан
    // в блок карточки, но если нет то 101px высота внутренностей
    min-height: 101px;

    &-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-title {
      font-weight: 700;
      font-size: 20px;
      line-height: 140%;
    }
    &-date {
      display: flex;
      flex-direction: column;
      font-size: 10px;
      color: $disabled-color;

      div {
        display: flex;
        gap: 2px;
        justify-content: space-between;
      }
      p {
        margin: 0;
        color: $bg-button-color;
      }
    }
  }
  .task-block-buttons {
    display: flex;
    align-items: flex-start;
    gap: 2px;
  }
  .description {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
  }
  .closed {
    text-decoration: line-through;
  }
  .button-ico {
    background: none;
    padding: 0;
    outline: none;
    border: none;
    cursor: pointer;

    img {
      width: 24px;
    }
  }
}
</style>