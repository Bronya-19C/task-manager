<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div
      v-for="col in columns"
      :key="col.status"
      class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 min-h-[300px]"
      @dragover.prevent="onDragOver"
      @dragenter.prevent="onDragEnter(col.status)"
      @dragleave="onDragLeave(col.status)"
      @drop="onDrop(col.status)"
      :class="{ 'ring-2 ring-blue-400 bg-blue-50 dark:bg-blue-900/20': dragOver === col.status }"
    >
      <h3 class="font-semibold text-sm mb-3 flex items-center justify-between">
        <span>{{ col.emoji }} {{ col.label }}</span>
        <span class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
          {{ getByStatus(col.status).length }}
        </span>
      </h3>

      <div
        v-for="task in getByStatus(col.status)"
        :key="task.id"
        draggable="true"
        @dragstart="onDragStart(task.id, $event)"
        @dragend="onDragEnd"
        class="bg-white dark:bg-gray-700 rounded-md shadow-sm p-3 mb-2 cursor-grab active:cursor-grabbing border-l-4 transition"
        :class="[PRIORITY_BG_COLORS[task.priority], { 'opacity-50': draggingId === task.id }]"
      >
        <p class="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">{{ task.title }}</p>
        <p v-if="task.description" class="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
          {{ task.description }}
        </p>
        <span
          class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full text-white"
          :class="PRIORITY_COLORS[task.priority]"
        >
          {{ PRIORITY_LABELS[task.priority] }}
        </span>
      </div>

      <div v-if="getByStatus(col.status).length === 0" class="text-center text-gray-300 dark:text-gray-600 py-8 text-sm">
        拖拽任务到此处
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Status, Task } from '../types/task'
import { PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_BG_COLORS } from '../types/task'

defineProps<{
  getByStatus: (status: Status) => Task[]
}>()

const emit = defineEmits<{
  statusChange: [id: string, status: Status]
}>()

const columns = [
  { status: 'todo' as Status, label: '待办', emoji: '📋' },
  { status: 'in-progress' as Status, label: '进行中', emoji: '🔄' },
  { status: 'done' as Status, label: '完成', emoji: '✅' },
]

const draggingId = ref<string | null>(null)
const dragOver = ref<Status | null>(null)

function onDragStart(taskId: string, event: DragEvent) {
  draggingId.value = taskId
  event.dataTransfer!.effectAllowed = 'move'
  event.dataTransfer!.setData('text/plain', taskId)
}

function onDragEnd() {
  draggingId.value = null
  dragOver.value = null
}

function onDragOver(event: DragEvent) {
  event.dataTransfer!.dropEffect = 'move'
}

function onDragEnter(status: Status) {
  dragOver.value = status
}

function onDragLeave(status: Status) {
  if (dragOver.value === status) {
    dragOver.value = null
  }
}

function onDrop(status: Status) {
  dragOver.value = null
  const taskId = draggingId.value
  if (!taskId) return
  emit('statusChange', taskId, status)
  draggingId.value = null
}
</script>