<template>
  <div class="tasks-page">
    <UiButton
        with-plus
        class="create-button"
        @click="openModal()"
    >
      Создать
    </UiButton>

    <div class="info-block">
      <div class="info-item">
        <span>Всего задач</span>
        <p>{{ taskStore.totalTasks }}</p>
      </div>
      <div class="info-item">
        <span class="done">Выполнено</span>
        <p v-if="taskStore.doneTasks.length > 0">
          {{ `${taskStore.doneTasks.length} из ${taskStore.totalTasks}` }}
        </p>
        <p v-else>0</p>
      </div>
    </div>

    <UiLoader :show="taskStore.isLoading" message="Загружаем задачи..."/>

    <div v-if="taskStore.tasks.length" class="tasks-list">
      <TaskItem
          v-for="task in taskStore.tasks"
          :key="task.id"
          :task="task"
          @edit="openModal(task)"
          @delete="deleteTask(task.id)"
          @toggle="toggleTaskStatus(task.id)"
      />
    </div>
    <div v-else>
      <NoTasks />
    </div>

    <ModalOverlay :show="showModal" @close="closeModal">
      <TaskForm
          :task="editingTask"
          @submit="editingTask !== undefined ? updateTask(editingTask.id, $event) : createTask($event)"
          @cancel="closeModal"
      />
    </ModalOverlay>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '~/stores/useTaskStore'
import type { Task } from '~/types/task'

const taskStore = useTaskStore()
const showModal = ref(false)
const editingTask = ref<Task | undefined>()

const openModal = (task?: Task) => {
  editingTask.value = task
  showModal.value = true
  // закрепляем скролл при модалке
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  editingTask.value = undefined
  document.body.style.overflow = ''
}

const createTask = async (taskData: Omit<Task, 'id'>) => {
  await taskStore.createTask(taskData)
  closeModal()
}

const updateTask = async (id: number, taskData: Partial<Task>) => {
  await taskStore.updateTask(id, taskData)
  closeModal()
}

const deleteTask = (id: number) => taskStore.deleteTask(id)
const toggleTaskStatus = (id: number) => taskStore.toggleTaskStatus(id)

onMounted(() => {
  taskStore.fetchTasks()
})
</script>

<style lang="scss" scoped>
.tasks-page {
  width: 736px;
  position: relative;
  margin: 0 0 20px 0;

  .create-button {
    transform: translate(0, -26px);
    margin: 0 0 40px 0;
  }

  .info-block {
    display: flex;
    justify-content: space-between;
    margin: 0 0 24px 0;

    .info-item {
      display: flex;
      align-items: center;

      span {
        color: $span-text;
        font-weight: 700;
        font-size: 14px;

        &.done {
          color: $hover-color;
        }
      }

      p {
        border-radius: 50px;
        padding: 2px 8px;
        background: $border-color;
        margin: 0 8px;
        font-size: 12px;
        font-weight: 700;
      }
    }
  }

  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>