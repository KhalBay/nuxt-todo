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

    <div class="calendar">
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
          <nuxt-img src="./calendar.svg" class="calendar-ico"/>
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
  gap: 10px;

  .form-group {
    display: flex;
    flex-direction: column;
  }
  .error {
    color: $error-color;
    margin: 2px 0 0 0;
    font-size: 10px;
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    margin: 0 0 10px 0;
  }
  input {
    background: $bg-task-color;
    height: 38px;
    border: 1px solid $bg-header-color;
    padding: 9px 16px;
    color: white;
    font-size: 14px;
    border-radius: 8px;
    box-sizing: border-box;
  }
  .custom-date-input {
    width: 100%;
  }
  .calendar {
    position: relative;

    &-ico {
      position: absolute;
      top: 9px;
      right: 16px;
      width: 20px;
      height: 20px;
      pointer-events: none;
    }

    // Стили для календаря
    :deep(.vc-container) {
      --vc-bg: $bg-calendar;
      --vc-text: white;
      --vc-accent-50: $calendar-accent;
      --vc-border: 1px solid $bg-calendar;
      --vc-rounded: 8px;
      --vc-gray-700: $bg-calendar;
      --vc-header-arrow-color: none;
    }
    :deep(.vc-title) {
      background: none;
      color: $calendar-text;
    }
    :deep(.vc-nav-container) {
      background: $bg-calendar;
      color: $calendar-text;
    }
    :deep(.vc-header .vc-arrow) {
      background: none;
      color: $calendar-text;
    }
    :deep(.vc-weekday) {
      color: $calendar-text;
    }
    :deep(.vc-dark .vc-attr) {
      --vc-highlight-solid-bg: $hover-color;
    }
    :deep(.vc-monthly .is-not-in-month *) {
      opacity: .4;
    }
    :deep(.vc-day) {
      min-height: 35px;
      min-width: 35px;
    }
    :deep(.vc-nav-arrow) {
      background: none;
    }
    :deep(.vc-nav-title) {
      background: none;
    }
    :deep(.vc-nav-item) {
      background: none;
      color: $disabled-color;
    }
    :deep(.vc-popover-content.direction-bottom) {
      background: #1E1E1E;
    }
    :deep(.vc-nav-item.is-active) {
      color: $text-color;
    }
    :deep(.vc-weekdays) {
      gap: 5px;
    }
    :deep(.vc-week) {
      gap: 5px;
    }
  }
}
</style>