<template>
  <div class="block">
    <NuxtImg src="./Clipboard.svg" class="block-img"/>
    <p class="block-text">
      <b>У Вас еще нет созданных задач</b> <br>
      Создавайте задачи и организуйте свои дела
    </p>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 24px;
  border-top: 1px solid $border-color;
  border-radius: 8px;

  &-img {
    width: 56px;
    height: 56px;
    margin: 0 0 16px 0;
  }

  &-text {
    text-align: center;
    color: $disabled-color;
    margin: 0;
  }
}

</style>