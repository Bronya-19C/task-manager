<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <header class="bg-white dark:bg-gray-800 shadow p-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <h1 class="text-xl font-bold">📋 任务管理器</h1>
        <div class="flex items-center gap-3">
          <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
            <button
              @click="view = 'list'"
              class="px-3 py-1 text-sm rounded-md transition"
              :class="view === 'list' ? 'bg-white dark:bg-gray-600 shadow' : 'text-gray-500'"
            >📄 列表</button>
            <button
              @click="view = 'kanban'"
              class="px-3 py-1 text-sm rounded-md transition"
              :class="view === 'kanban' ? 'bg-white dark:bg-gray-600 shadow' : 'text-gray-500'"
            >📊 看板</button>
          </div>
          <button
            @click="toggleDark"
            class="px-2 py-1 text-lg rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="切换深色模式"
          >
            {{ isDark ? '☀️' : '🌙' }}
          </button>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            共 {{ tasks.length }} 个任务
          </span>
        </div>
      </div>
    </header>

    <main v-if="view === 'list'" class="max-w-3xl mx-auto p-4">
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

    <main v-else class="max-w-6xl mx-auto p-4">
      <div class="mb-4 flex justify-end">
        <button
          @click="showForm = !showForm"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
        >
          {{ showForm ? '收起表单' : '+ 新建任务' }}
        </button>
      </div>
      <TaskForm
        v-if="showForm"
        ref="formRef"
        @add="onAdd"
        @update="onUpdate"
      />
      <KanbanBoard
        :get-by-status="getByStatus"
        @status-change="onStatusChange"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import KanbanBoard from './components/KanbanBoard.vue'
import { useTaskManager } from './composables/useTaskManager'
import { useDarkMode } from './composables/useDarkMode'
import type { Priority, Status } from './types/task'

const { tasks, add, update, remove, getByStatus } = useTaskManager()
const { isDark, toggle: toggleDark } = useDarkMode()
const formRef = ref<InstanceType<typeof TaskForm> | null>(null)
const view = ref<'list' | 'kanban'>('list')
const showForm = ref(false)

function onAdd(title: string, description: string, priority: Priority) {
  add(title, description, priority)
  showForm.value = false
}

function onUpdate(id: string, title: string, description: string, priority: Priority) {
  update(id, { title, description, priority })
}

function onEdit(id: string, title: string, description: string, priority: Priority) {
  view.value = 'list'
  formRef.value?.startEdit(id, title, description, priority)
}

function onDelete(id: string) {
  remove(id)
}

function onStatusChange(id: string, status: Status) {
  update(id, { status })
}
</script>
