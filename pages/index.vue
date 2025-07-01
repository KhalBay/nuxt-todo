<template>
  <div class="tasks-page">
    <UiButton
        @click="openModal()"
        with-plus
        class="create-button"
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

    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

    <template v-if="!isLoading">
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
    </template>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-close" @click="closeModal">×</div>
        <TaskForm
            :task="editingTask"
            @submit="editingTask !== undefined ? updateTask(editingTask.id, $event) : createTask($event)"
            @cancel="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '~/api'
import { useTaskStore } from '~/stores/useTaskStore'
import type { Task } from '~/types/task'

const taskStore = useTaskStore()
const showModal = ref(false)
const isLoading = ref(true)
const editingTask = ref<Task | undefined>()

const fetchTasks = async () => {
  isLoading.value = true
  try {
    const { data } = await api.task.getAll()
    taskStore.setTasks(data)
  } catch (error) {
    console.error('Ошибка загрузки задач:', error)
  } finally {
    isLoading.value = false
  }
}


const createTask = async (taskData: Omit<Task, 'id'>) => {
  try {
    const { data: newTask } = await api.task.create(taskData)
    taskStore.addTask(newTask)
    closeModal()
  } catch (error) {
    console.error('Ошибка создания задачи:', error)
  }
}

const updateTask = async (id: number, taskData: Omit<Partial<Task>, 'id'>) => {
  try {
    const { data: updatedTask } = await api.task.update(id, {
      ...taskStore.getTaskById(id),
      ...taskData
    })
    taskStore.updateTaskInStore(updatedTask)
    closeModal()
  } catch (error) {
    console.error('Ошибка обновления задачи:', error)
  } finally {
    editingTask.value = undefined
  }
}

const deleteTask = async (id: number) => {
  try {
    await api.task.delete(id)
    taskStore.removeTask(id)
  } catch (error) {
    console.error('Ошибка удаления задачи:', error)
  }
}

const toggleTaskStatus = async (id: number) => {
  const task = taskStore.getTaskById(id)
  if (task) {
    try {
      await api.task.update(id, { ...task, isDone: !task.isDone })
      taskStore.toggleTaskStatus(id)
    } catch (error) {
      console.error('Ошибка изменения статуса:', error)
    }
  }
}

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

onMounted(fetchTasks)
</script>

<style lang="scss">
.tasks-page {
  width: 736px;
  position: relative;
  margin: 0 0 20px 0;

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
    z-index: 1000;
  }

  .modal-content {
    width: 90%;
    max-width: 500px;
    position: relative;
    gap: 20px;
    border-radius: 10px;
    padding: 20px;
    background: #333333;
    border: 1px solid #262626;
  }

  .modal-close {
    position: absolute;
    top: 22px;
    right: 22px;
    font-size: 20px;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
    color: white;
    width: 23px;
    height: 23px;
    border-radius: 4px;
    background: #E25858;
  }

  .loading-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #1E6F9F;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  .loading-placeholder {
    text-align: center;
    padding: 20px;
    color: grey;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .create-button {
    transform: translate(0, -26px);
  }

  .info-block {
    display: flex;
    justify-content: space-between;
    margin: 0 0 24px 0;

    .info-item {
      display: flex;
      align-items: center;

      span {
        color: #4EA8DE;
        font-weight: 700;
        font-size: 14px;

        &.done {
          color: #8284FA;
        }
      }

      p {
        border-radius: 50px;
        padding: 2px 8px;
        background: #333333;
        margin: 0 8px;
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