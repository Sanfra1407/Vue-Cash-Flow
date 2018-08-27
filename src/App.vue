<template>
  <div id="app">
    <h1 class="title has-text-centered">Vue Cash Flow</h1>
      <CashFlow />
  </div>
</template>

<script>
import CashFlow from './components/CashFlow.vue'

export default {
  name: 'App',
  components: {
    CashFlow
  }
}

document.title = "Vue Cash Flow";
</script>

<style lang="scss">
  @import 'bulma';
  @import '~bulma-tooltip';

  #app {
    margin-top: 50px;
  }

  .fa + *{
    margin-left: 5px;
  }

  .select {
    &,
    select {
      width: 100%;
    }
  }
</style>
