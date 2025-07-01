<template>
  <div class="layout">
    <header class="header">
      <nuxt-img src="/logo.svg" alt="Логотип" class="logo" />
    </header>

    <main class="main">
      <slot/>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;

  .header {
    background: #0D0D0D;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;

    .logo {
      height: 48px;
    }
  }

  .main {
    display: flex;
    justify-content: center;
    color: white;
  }
}
</style>