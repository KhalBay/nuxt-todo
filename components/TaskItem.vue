<template>
  <div class="task-block" @click="navigateToTask">
    <div
        class="status"
        :class="task.isDone ? 'done' : 'undone'"
        @click.stop="$emit('toggle')"
    />
    <div class="info">
      <div :class="{'closed': task.isDone}">{{ task.title }}</div>
      <div class="date">
        <div>
          Дата создания: <p>{{ taskStore.formatDate(task.createdAt) }}</p>
        </div>
        <div>
          Дата окончания: <p>{{ taskStore.formatDate(task.endDate) }}</p>
        </div>
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
    <div
        class="description"
        :class="{'closed': task.isDone}"
    >
      {{ task.description }}
    </div>
<!--    <NuxtLink :to="`/tasks/${task.id}`">Подробнее</NuxtLink>-->
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
  background: #262626;
  border-radius: 8px;
  border: 1px solid #333333;
  padding: 16px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  cursor: pointer;

  .status {
    grid-area: 1 / 1 / 2 / 2;
    justify-self: center;
    width: 17px;
    height: 17px;
    border-radius: 20px;
    cursor: pointer;

    &.undone {
      border: 2px solid #4EA8DE;
    }

    &.done {
      border: 2px solid #5E60CE;
      background: #5E60CE;
      position: relative;

      &::before {
        content: 'L';
        position: absolute;
        transform: scale(-1, 1) rotate(315deg);
        left: 6px;
        bottom: 0;
        font-size: 14px;
      }
    }
  }

  .info {
    grid-area: 1 / 2 / 2 / 12;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 20px;


    .date {
      display: flex;
      flex-direction: column;
      font-size: 10px;
      color: #808080;

      div {
        display: flex;
        flex-wrap: nowrap;
        gap: 5px;
        justify-content: space-between;
      }

      p {
        margin: 0;
        color: #1E6F9F;
      }
    }
  }

  .task-block-buttons {
    grid-area: 1 / 12 / 2 / 13;
    display: flex;
  }
  .description {
    grid-area: 2 / 2 / 3 / 11;
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