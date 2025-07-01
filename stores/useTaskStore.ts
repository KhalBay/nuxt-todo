import { defineStore } from 'pinia'
import type { Task } from '~/types/task'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[]
    }),

    actions: {
        setTasks(tasks: Task[]) {
            this.tasks = tasks
        },
        addTask(task: Task) {
            this.tasks.push(task)
        },
        updateTaskInStore(updatedTask: Task) {
            const index = this.tasks.findIndex(t => t.id === updatedTask.id)
            if (index !== -1) {
                this.tasks.splice(index, 1, updatedTask)
            }
        },
        removeTask(id: number) {
            this.tasks = this.tasks.filter(t => t.id !== id)
        },
        toggleTaskStatus(id: number) {
            const task = this.tasks.find(t => t.id === id)
            if (task) {
                task.isDone = !task.isDone
            }
        },
        getTaskById(id: number): Task | undefined {
            return this.tasks.find(t => t.id === id)
        },
        formatDate(date: string): string {
            if (!date) return ''
            const currentDate = new Date(date)
            const currentMonth = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1
            const currentDay = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
            return `${currentDay}.${currentMonth}.${currentDate.getFullYear()}`
        }
    },

    getters: {
        doneTasks: (state) => state.tasks.filter(t => t.isDone),
        activeTasks: (state) => state.tasks.filter(t => !t.isDone),
        totalTasks: (state) => state.tasks.length
    }
})