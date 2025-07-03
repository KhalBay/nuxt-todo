<template>
  <div class="task-detail" v-if="task">
    <nav>
      <NuxtLink to="/">Главная</NuxtLink> / {{task?.title}}
    </nav>
    <div class="info-block">
      <h3>{{ task?.title }}</h3>
      <p>{{ task?.description }}</p>
    </div>
    <div class="date">
      <div>
        Дата создания: <p>{{ taskStore.formatDate(task.createdAt) }}</p>
      </div>
      <div>
        Дата окончания: <p>{{ taskStore.formatDate(task.endDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/stores/useTaskStore'
import { onMounted } from "vue";

const route = useRoute()
const taskStore = useTaskStore()

const task = computed(() => taskStore.currentTask)

useServerSeoMeta({
  title: () => task.value?.title || 'Задача',
  ogTitle: () => task.value?.title || 'Задача',
  description: () => task.value?.description || 'Описание задачи',
  ogDescription: () => task.value?.description || 'Описание задачи'
})

onMounted(async () => {
  try {
    await taskStore.fetchTaskById(Number(route.params.id))
  } catch (error) {
    throw createError({ statusCode: 404, statusMessage: 'Task Not Found' })
  }
})
</script>

<style lang="scss" scoped>
.task-detail {
  width: 736px;
  margin: 0 auto;
  padding: 31px;

  nav {
    cursor: default;
    margin: 0 0 8px 0;
    color: $disabled-color;

    a {
      color: $disabled-color;
      text-decoration: none;
    }
  }

  .info-block {
    border: 1px solid $border-color;
    border-radius: 8px;
    background: $bg-task-color;
    color: $text-color;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 0 0 8px 0;

    h3 {
      margin: 0;
      font-size: 20px;
    }

    p {
      margin: 0;
      font-size: 14px;
    }
  }


  .date {
    display: flex;
    flex-direction: column;
    font-size: 10px;
    color: $disabled-color;
    width: max-content;

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
</style>