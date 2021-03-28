<template>
  <transition-group name="fade" tag="tbody" :duration="150">
    <tr v-for="(flow, index) in cashFlow" :key="flow.id">
      <td class="has-text-centered">
        <span>{{ currency }} {{ formattedAmount(flow) }}</span>
      </td>
      <td class="has-text-centered">
        <i v-if="flowTypeIsACost(flow)" class="fa fa-arrow-right has-text-danger" title="Cost"/>
        <i v-else class="fa fa-arrow-left has-text-success" title="Income"/>
      </td>
      <td class="has-text-centered">
        <button class="button is-danger is-small" @click="removeRow(index)">
          <i class="fa fa-trash" />
        </button>
      </td>
    </tr>
  </transition-group>
</template>

<script>
import { formatCurrency } from '../utils';

export default {
  name: 'TableBody',
  props: {
    currency: {
      type: String,
      required: true,
    },

    currencyFormat: {
      type: String,
      required: true,
    },

    cashFlow: {
      type: Array,
      required: true,
    },

    removeRow: {
      type: Function,
      required: true,
    },
  },

  methods: {
    formattedAmount(flow) {
      const {amount} = flow;

      return formatCurrency(this.currencyFormat, amount);
    },

    flowTypeIsACost(flow) {
      return flow.type === 'cost';
    },
  }
}
</script>

<style lang="scss" scoped>
  .fade {
    &-enter {
      opacity: 0;

      &-active {
        transition: opacity 1s;
      }
    }
  }
</style>
