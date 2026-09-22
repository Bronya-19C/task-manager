<template>
  <form @submit.prevent="onSubmit" class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
    <div class="flex flex-col gap-3">
      <input
        v-model="form.title"
        type="text"
        placeholder="任务标题（必填）"
        required
        class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        v-model="form.description"
        placeholder="描述（选填）"
        rows="2"
        class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <div class="flex items-center gap-4">
        <label class="text-sm text-gray-600 dark:text-gray-300">优先级：</label>
        <select
          v-model="form.priority"
          class="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="high">🔴 高</option>
          <option value="medium">🟡 中</option>
          <option value="low">🟢 低</option>
        </select>
        <button
          type="submit"
          class="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {{ editingId ? '更新' : '添加' }}
        </button>
        <button
          v-if="editingId"
          type="button"
          @click="reset"
          class="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          取消
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Priority } from '../types/task'

const emit = defineEmits<{
  add: [title: string, description: string, priority: Priority]
  update: [id: string, title: string, description: string, priority: Priority]
}>()

const editingId = ref<string | null>(null)

const form = reactive({
  title: '',
  description: '',
  priority: 'medium' as Priority,
})

function onSubmit() {
  if (!form.title.trim()) return
  if (editingId.value) {
    emit('update', editingId.value, form.title.trim(), form.description.trim(), form.priority)
  } else {
    emit('add', form.title.trim(), form.description.trim(), form.priority)
  }
  reset()
}

function reset() {
  form.title = ''
  form.description = ''
  form.priority = 'medium'
  editingId.value = null
}

function startEdit(id: string, title: string, description: string, priority: Priority) {
  form.title = title
  form.description = description
  form.priority = priority
  editingId.value = id
}

defineExpose({ startEdit, reset })
</script>