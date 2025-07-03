import { defineStore } from 'pinia'
import type { Task } from '~/types/task'
import { api } from '~/api'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[],
        currentTask: null as Task | null,
        isLoading: true,
        error: null as Error | null
    }),

    getters: {
        totalTasks: (state) => state.tasks.length,
        doneTasks: (state) => state.tasks.filter(task => task.isDone),
        getTaskById: (state) => (id: number) => state.tasks.find(task => task.id === id)
    },

    actions: {
        async fetchTasks() {
            this.isLoading = true
            try {
                const { data } = await api.task.getAll()
                this.tasks = data
            } catch (error) {
                console.error('Error fetching tasks:', error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async fetchTaskById(id: number) {
            this.isLoading = true
            try {
                const localTask = this.getTaskById(id)
                if (localTask) {
                    this.currentTask = localTask
                    return localTask
                }

                const { data } = await api.task.getById(id)
                this.currentTask = data
                return data
            } catch (error) {
                console.error(`Error fetching task ${id}:`, error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async createTask(taskData: Omit<Task, 'id'>) {
            try {
                const { data } = await api.task.create(taskData)
                this.tasks.push(data)
                return data
            } catch (error) {
                console.error('Error creating task:', error)
                throw error
            }
        },
        async updateTask(id: number, taskData: Partial<Task>) {
            try {
                const { data } = await api.task.update(id, taskData)
                const index = this.tasks.findIndex(t => t.id === id)
                if (index !== -1) {
                    this.tasks[index] = data
                }
                if (this.currentTask?.id === id) {
                    this.currentTask = data
                }
                return data
            } catch (error) {
                console.error(`Error updating task ${id}:`, error)
                throw error
            }
        },
        async deleteTask(id: number) {
            try {
                await api.task.delete(id)
                this.tasks = this.tasks.filter(task => task.id !== id)
                if (this.currentTask?.id === id) {
                    this.currentTask = null
                }
            } catch (error) {
                console.error(`Error deleting task ${id}:`, error)
                throw error
            }
        },
        async toggleTaskStatus(id: number) {
            const task = this.getTaskById(id)
            if (task) {
                try {
                    await this.updateTask(id, { isDone: !task.isDone })
                } catch (error) {
                    console.error(`Error toggling task status ${id}:`, error)
                    throw error
                }
            }
        },
        formatDate(date: string): string {
            if (!date) return ''
            const currentDate = new Date(date)
            const currentMonth = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1
            const currentDay = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
            return `${currentDay}.${currentMonth}.${currentDate.getFullYear()}`
        }
    }
})