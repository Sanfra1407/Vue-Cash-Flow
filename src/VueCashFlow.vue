<template>
  <div id="vfc">
    <h1 class="title has-text-centered">Vue Cash Flow</h1>
    <CashFlow></CashFlow>
  </div>
</template>

<script>
import CashFlow from './components/CashFlow.vue';

export default {
  name: 'VueCashFlow',
  components: {
    CashFlow
  }
}
</script>

<style lang="scss">
  @import "bulma/css/bulma.min.css";
  @import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css';
  @import 'font-awesome/css/font-awesome.min.css';

  #vfc {
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
