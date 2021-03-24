<template>
  <transition name="fade">
    <tr v-if="flow">
      <td class="has-text-centered">
        <span>{{ currency }} {{ formattedAmount }}</span>
      </td>
      <td class="has-text-centered">
        <i class="fa fa-arrow-right has-text-danger" v-if="flowTypeIsACost" />
        <i class="fa fa-arrow-left has-text-success" v-else />
      </td>
      <td class="has-text-centered">
        <button class="button is-danger is-small" @click="removeRow(index)">
          <i class="fa fa-trash" />
        </button>
      </td>
    </tr>
  </transition>
</template>

<script>
import { formatCurrency } from '../utils';

export default {
  props: {
    currency: {
      type: String,
      required: true,
    },

    currencyFormat: {
      type: String,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },

    removeRow: {
      type: Function,
      required: true,
    },

    flow: {
      type: Object,
      required: true
    }
  },

  computed:{
    flowTypeIsACost() {
      return this.flow.type === 'cost';
    },

    formattedAmount() {
      const {amount} = this.flow;

      return formatCurrency(this.currencyFormat, amount);
    }
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
