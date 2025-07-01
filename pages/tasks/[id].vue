<template>
  <div class="task-detail">
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
import { api } from '~/api'

const route = useRoute()
const taskStore = useTaskStore()


const { data: task } = await useAsyncData(
    `task-${route.params.id}`,
    async () => {
      const storeTask = taskStore.getTaskById(Number(route.params.id))
      if (storeTask) return storeTask

      try {
        const { data } = await api.task.getById(Number(route.params.id))
        return data
      } catch (error) {
        throw createError({ statusCode: 404, statusMessage: 'Task Not Found' })
      }
    }
)

if (!task.value) {
  throw createError({ statusCode: 404, statusMessage: 'Task Not Found' })
}

useServerSeoMeta({
  title: () => task.value?.title || 'Задача',
  ogTitle: () => task.value?.title || 'Задача',
  description: () => task.value?.description || 'Описание задачи',
  ogDescription: () => task.value?.description || 'Описание задачи'
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
    color: #808080;

    a {
      color: #808080;
      text-decoration: none;
    }
  }

  .info-block {
    border: 1px solid #333333;
    border-radius: 8px;
    background: #262626;
    color: #F2F2F2;
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
    color: #808080;
    width: 20%;

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
</style>