<template>
  <div class="layout">
    <header class="header">
      <NuxtLink to="/">
        <nuxt-img src="/logo.svg" alt="Логотип" class="logo" />
      </NuxtLink>
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
  box-sizing: border-box;

  .header {
    background: $bg-header-color;
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

@media (max-width: 750px) {
  .main {
    margin: 0 16px;
  }
}
</style>