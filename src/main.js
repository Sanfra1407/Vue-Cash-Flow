import Vue from 'vue';
import VueCashFlow from './VueCashFlow';

Vue.config.productionTip = false;

new Vue({
  el: '#vcf',
  render: h => h(VueCashFlow)
});
