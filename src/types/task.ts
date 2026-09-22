export type Priority = 'high' | 'medium' | 'low'
export type Status = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  createdAt: number
}

export const STATUS_LABELS: Record<Status, string> = {
  'todo': '待办',
  'in-progress': '进行中',
  'done': '完成',
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
}

export const PRIORITY_TEXT_COLORS: Record<Priority, string> = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600',
}

export const PRIORITY_BG_COLORS: Record<Priority, string> = {
  high: 'bg-red-50 border-red-300',
  medium: 'bg-yellow-50 border-yellow-300',
  low: 'bg-green-50 border-green-300',
}

export function createTask(title: string, description: string, priority: Priority): Task {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    title,
    description,
    priority,
    status: 'todo',
    createdAt: Date.now(),
  }
}