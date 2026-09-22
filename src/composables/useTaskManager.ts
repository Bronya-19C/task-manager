import { ref, watch } from 'vue'
import type { Task, Priority, Status } from '../types/task'
import { createTask } from '../types/task'

const STORAGE_KEY = 'task-manager-tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

const tasks = ref<Task[]>(loadTasks())

watch(tasks, saveTasks, { deep: true })

export function useTaskManager() {
  function add(title: string, description: string, priority: Priority) {
    tasks.value.push(createTask(title, description, priority))
  }

  function update(id: string, patch: Partial<Pick<Task, 'title' | 'description' | 'priority' | 'status'>>) {
    const idx = tasks.value.findIndex(t => t.id === id)
    if (idx !== -1) {
      tasks.value[idx] = { ...tasks.value[idx], ...patch }
    }
  }

  function remove(id: string) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function getByStatus(status: Status): Task[] {
    return tasks.value.filter(t => t.status === status)
  }

  return { tasks, add, update, remove, getByStatus }
}