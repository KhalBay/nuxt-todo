export interface Task {
    id: number
    title: string
    description: string
    endDate: string
    createdAt: string
    isDone: boolean
}

export interface ApiResponse<T> {
    data: T
}