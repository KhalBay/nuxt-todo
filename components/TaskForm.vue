<template>
  <form @submit.prevent="submitForm" class="task-form">
    <div class="title">{{ props.task ? 'Обновить' : 'Создать' }} задачу</div>
    <div class="form-group">
      <input
          id="title"
          placeholder="Заголовок"
          v-model="form.title"
          @blur="v$.title.$touch"
      />
      <span class="error" v-if="v$.title.$error">
        Заголовок обязателен
      </span>
    </div>

    <div class="form-group">
      <input
          placeholder="Текст"
          id="description"
          v-model="form.description"
          @blur="v$.description.$touch"
      />
      <span class="error" v-if="v$.description.$error">
        Текст должен содержать минимум 3 символа
      </span>
    </div>

    <div>
      <DatePicker
          v-model="form.endDate"
          mode="date"
          :masks="{ input: 'DD.MM.YYYY' }"
          :popover="{
            placement: 'bottom-end',
          }"
          is-required
          is-dark
          title-position="left"
      >
        <template #default="{ inputValue, inputEvents }">
          <input
              :value="inputValue"
              v-on="inputEvents"
              placeholder="Дата окончания"
              @blur="v$.endDate.$touch"
              class="custom-date-input"
          />
        </template>
      </DatePicker>

      <span class="error" v-if="v$.endDate.$error">
        {{ v$.endDate.$errors[0]?.$message }}
      </span>
    </div>

    <UiButton
        type="submit"
        :disabled="v$.$invalid"
    >
      {{ props.task ? 'Обновить' : 'Создать' }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { DatePicker } from 'v-calendar'
import type { Task } from "~/types/task"
import 'v-calendar/style.css'


const props = defineProps<{
  task?: Task
}>()

const emit = defineEmits(['submit'])

const form = reactive({
  title: props.task?.title || '',
  description: props.task?.description || '',
  endDate: props.task?.endDate ? new Date(props.task.endDate) : null
})

const rules = {
  title: { required },
  description: {
    required,
    minLength: minLength(3)
  },
  endDate: {
    required,
    validDate: helpers.withMessage(
        'Введите корректную дату',
        (value) => {
          if (!value) return false
          return value instanceof Date && !isNaN(value.getTime())
        }
    )
  }
}

const v$ = useVuelidate(rules, form)

const submitForm = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  emit('submit', {
    ...form,
    endDate: form.endDate?.toISOString()
  })

  v$.value.$reset()
}
</script>

<style lang="scss" scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .error {
    color: #E25858;
    font-size: 0.8rem;
  }

  .title {
    font-weight: 700;
    font-size: 20px;
    margin: 0 0 20px 0;
  }

  input {
    background: #262626;
    height: 38px;
    border: 1px solid #0D0D0D;
    padding: 9px 16px;
    color: white;
    font-size: 14px;
    border-radius: 8px;
    box-sizing: border-box;
  }

  .custom-date-input {
    width: 100%;
  }


  :deep(.vc-container) {
    --vc-bg: #1E1E1E;
    --vc-text: #FFFFFF;
    --vc-accent-50: #812020;
    --vc-border: 1px solid #1E1E1E;
    --vc-rounded: 8px;
    --vc-gray-700: #1E1E1E;
    --vc-header-arrow-color: none;
  }

  :deep(.vc-title) {
    background: none;
    color: #ADADAD;
  }
  :deep(.vc-nav-container) {
    background: #1E1E1E;
    color: #ADADAD;
  }
  :deep(.vc-header .vc-arrow) {
    background: none;
    color: #ADADAD;
  }
  :deep(.vc-weekday) {
    color: #ADADAD;
  }
  :deep(.vc-dark .vc-attr) {
    --vc-highlight-solid-bg: #8284FA;
  }
}
</style>