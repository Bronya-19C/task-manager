<template>
  <div>
    <div v-if="tasks.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-10">
      暂无任务，在上面添加一个吧 ✍️
    </div>
    <div v-else class="flex flex-col gap-3">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 transition"
        :class="PRIORITY_BG_COLORS[task.priority]"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 truncate">{{ task.title }}</h3>
            <p v-if="task.description" class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ task.description }}</p>
            <div class="flex items-center gap-2 mt-2">
              <span
                class="text-xs px-2 py-0.5 rounded-full text-white"
                :class="PRIORITY_COLORS[task.priority]"
              >
                {{ PRIORITY_LABELS[task.priority] }}
              </span>
              <select
                :value="task.status"
                @change="onStatusChange(task.id, ($event.target as HTMLSelectElement).value as Status)"
                class="text-xs px-2 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="todo">📋 待办</option>
                <option value="in-progress">🔄 进行中</option>
                <option value="done">✅ 完成</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <button
              @click="$emit('edit', task.id, task.title, task.description, task.priority)"
              class="p-1.5 text-gray-400 hover:text-blue-500 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title="编辑"
            >
              ✏️
            </button>
            <button
              @click="$emit('delete', task.id)"
              class="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title="删除"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task, Status } from '../types/task'
import { PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_BG_COLORS } from '../types/task'

defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  edit: [id: string, title: string, description: string, priority: Task['priority']]
  delete: [id: string]
  statusChange: [id: string, status: Status]
}>()

function onStatusChange(id: string, status: Status) {
  emit('statusChange', id, status)
}
</script>