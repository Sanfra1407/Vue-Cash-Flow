<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-1 is-offset-3">
        <div class="select">
          <select v-model="currency">
            <option>€</option>
            <option>$</option>
            <option>£</option>
            <option>¥</option>
          </select>
        </div>
      </div>

      <div class="column is-2">
        <div class="control has-icons-right">
          <input class="input has-text-centered" type="text" placeholder="0,00" ref="balance" v-model="balance">
          <span class="icon is-small is-right">
            {{ currency }}
          </span>
        </div>
      </div>

      <div class="column is-2">
        <div class="control">
          <div class="select">
            <select v-model="type">
              <option value="cost">Cost</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>
      </div>

      <div class="column is-1">
        <div class="control has-text-left">
          <button 
            class="button is-primary" 
            :disabled="regexBalance === false" 
            @click="editBalance">
            Add</button>
        </div>
      </div>

      <div class="column is-6 is-offset-3">
        <div class="columns">
          <div class="column is-half">
            <h4 class="title is-4">
              <span>Balance: <span v-html="totalFlow"/> {{ currency }}</span>
            </h4>
          </div>
          <div class="column is-3" v-if="this.cashFlow.length > 0">
            <button class="button is-link is-small tooltip is-tooltip-bottom" 
                    data-tooltip="Save into local storage." 
                    @click="saveBalance()">
              <i class="fa fa-save"></i>
              <span>Save</span>
            </button>
          </div>
          <div class="column is-3" v-if="this.cashFlow.length > 0">
            <button class="button is-danger is-small tooltip is-tooltip-bottom" 
                    data-tooltip="Flush cash flow from everywhere!"
                    @click="flushBalance()">
              <i class="fa fa-trash"></i>
              <span>Flush</span>
            </button>
          </div>
        </div>

        <transition name="fade-balance">
          <hr class="divide" v-if="this.cashFlow.length > 0">
        </transition>
      </div>

      <div class="column is-6 is-offset-3" v-if="this.cashFlow.length > 0">
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <th class="has-text-centered">Amount</th>
            <th class="has-text-centered">Type</th>
            <th class="has-text-centered">Actions</th>
          </thead>
          <tbody>
            <tr 
              is="Flow" 
              v-for="(flow, index) in cashFlow" 
              :key="flow.id"
              :index="index"
              :flow="flow" 
              :currency="currency"
              :removeRow="removeRow"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Flow from "./Flow";

export default {
  components: {
    Flow
  },
  data() {
    return {
      type: "income",
      balance: "",
      currency: '€',
      totalBalance: 0.0,
      cashFlow: [],
    };
  },
  mounted() {
    const savedBalance = localStorage.getItem('vue-cash-flow-balance');
    if (savedBalance && savedBalance.length > 0) {
      this.cashFlow = JSON.parse(savedBalance);
    }
  },
  methods: {
    editBalance() {
      this.cashFlow.push({
        id: Date.now(),
        type: this.type,
        amount: parseFloat(this.balance.toString().replace(',', '.'))
      });
      this.balance = "";
      this.$refs.balance.focus();
    },
    removeRow(index) {
      this.cashFlow.splice(index, 1);
    },
    saveBalance() {
      localStorage.setItem('vue-cash-flow-balance', JSON.stringify(this.cashFlow));
    },
    flushBalance() {
      this.cashFlow = [];
      localStorage.removeItem('vue-cash-flow-balance');
    }
  },
  computed: {
    regexBalance() {
      return /^(\d*([.,])?\d{1,2})$/.test(this.balance);
    },
    totalFlow() {
      let total = 0;
      this.cashFlow.map((item) => {
        if (item.type === 'cost') {
          total -= item.amount;
        }
        else {
          total += item.amount;
        }
      });
      const className = total >= 0 ? "has-text-success" : "has-text-danger";
    
      return '<span class="' + className + '">' + total.toFixed(2).replace('.', ',') + '</span>'
    }
  },
};
</script>

<style lang="scss" scoped>
  .divide {
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
  }
  .fade-balance {
    &-enter {
      opacity: 0;

      &-active {
        transition: opacity 1s;
      }
    }
  } 

  .button {
    width: 100%;
  }
</style>