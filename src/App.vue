<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <header class="bg-white dark:bg-gray-800 shadow p-4">
      <div class="max-w-3xl mx-auto flex items-center justify-between">
        <h1 class="text-xl font-bold">📋 任务管理器</h1>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          共 {{ tasks.length }} 个任务
        </span>
      </div>
    </header>
    <main class="max-w-3xl mx-auto p-4">
      <TaskForm
        ref="formRef"
        @add="onAdd"
        @update="onUpdate"
      />
      <TaskList
        :tasks="tasks"
        @edit="onEdit"
        @delete="onDelete"
        @status-change="onStatusChange"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import { useTaskManager } from './composables/useTaskManager'
import type { Priority, Status } from './types/task'

const { tasks, add, update, remove } = useTaskManager()
const formRef = ref<InstanceType<typeof TaskForm> | null>(null)

function onAdd(title: string, description: string, priority: Priority) {
  add(title, description, priority)
}

function onUpdate(id: string, title: string, description: string, priority: Priority) {
  update(id, { title, description, priority })
}

function onEdit(id: string, title: string, description: string, priority: Priority) {
  formRef.value?.startEdit(id, title, description, priority)
}

function onDelete(id: string) {
  remove(id)
}

function onStatusChange(id: string, status: Status) {
  update(id, { status })
}
</script>
