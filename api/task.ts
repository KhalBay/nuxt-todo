import { httpClient } from "~/plugins/httpClient"
import type { ApiResponse, Task } from "~/types/task"

export default {
  getAll: (): Promise<ApiResponse<Task[]>> => httpClient.get('tasks'),
  getById: (id: number): Promise<ApiResponse<Task>> => httpClient.get(`tasks/${id}`),
  create: (taskData: Task): Promise<ApiResponse<Task>> => httpClient.post('tasks', taskData),
  update: (id: number, taskData: Task): Promise<ApiResponse<Task>> => httpClient.put(`tasks/${id}`, taskData),
  delete: (id: number): Promise<ApiResponse<void>> => httpClient.delete(`tasks/${id}`)
}