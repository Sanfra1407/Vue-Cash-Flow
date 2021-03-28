<template>
  <div class="container cash-flow">
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
          <input :class="['input has-text-centered', 
                  isFilledBalance && !isValidBalance ? 'has-text-danger is-danger' : null
                ]" 
                type="text" 
                placeholder="0,00" 
                v-model="balance">
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
            :disabled="!isValidBalance" 
            @click="editBalance">
            Add</button>
        </div>
      </div>

      <div class="column is-6 is-offset-3">
        <div class="columns">
          <div class="column is-8">
            <h4 class="title is-4">
              <span>Balance: {{ currency }} <span v-html="totalFlow"/></span>
            </h4>
          </div>
          <div class="column is-2" v-if="cashFlowIsNotEmpty">
            <button class="button is-link is-small tooltip is-tooltip-bottom" 
                    data-tooltip="Save into local storage." 
                    @click="saveBalance()">
              <i class="fa fa-save"></i>
              <span>Save</span>
            </button>
          </div>
          <div class="column is-2" v-if="cashFlowIsNotEmpty">
            <button class="button is-danger is-small tooltip is-tooltip-bottom" 
                    data-tooltip="Flush cash flow from everywhere!"
                    @click="flushBalance()">
              <i class="fa fa-trash"></i>
              <span>Flush</span>
            </button>
          </div>
        </div>

        <transition name="fade-balance" :duration="150">
          <hr class="divide" v-if="cashFlowIsNotEmpty">
        </transition>
      </div>

      <transition name="fade-balance" :duration="150">
        <div class="column is-6 is-offset-3" v-if="cashFlowIsNotEmpty">
          <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <th class="has-text-centered">Amount</th>
              <th class="has-text-centered">Type</th>
              <th class="has-text-centered">Actions</th>
            </thead>
            <TableBody 
              :cash-flow="cashFlow"
              :currency="currency"
              :currencyFormat="getCurrencyFormat"
              :removeRow="removeRow"
            ></TableBody>
          </table>
        </div>
      </transition>
    </div>

    <Notification
      v-if="saveNotification"
      message="Cash flow saved into local storage."
      :closeNotification="() => saveNotification = false"
    />

    <Notification 
      v-if="flushNotification"
      type="danger"
      message="Local storage has been flushed!"
      :closeNotification="() => flushNotification = false"
    />
  </div>
</template>

<script>
import TableBody from "./TableBody";
import Notification from "./Notification";
import { formatCurrency } from "../utils";

export default {
  name: "CashFlow",
  components: {
    TableBody,
    Notification
  },

  data() {
    return {
      type: "income",
      balance: "",
      currency: '€',
      totalBalance: 0.0,
      cashFlow: [],
      saveNotification: false,
      flushNotification: false,
    };
  },

  computed: {
    isValidBalance() {
      return /^(\d*([.,])?\d{1,2})$/.test(this.balance);
    },

    isFilledBalance() {
      return !!this.balance;
    },

    cashFlowIsNotEmpty() {
      return this.cashFlow.length > 0;
    },

    getCurrencyFormat() {
      return {
        '€': 'de-DE',
        '$': 'en-US',
        '£': 'en-UK',
        '¥': 'ja-JP',
      }[this.currency];
    },

    totalFlow() {
      let total = 0;

      this.cashFlow.map(({type, amount}) => {
        total += type === 'cost' ? -amount : amount;
      });

      const className = total >= 0 ? "has-text-success" : "has-text-danger";
    
      return `<span class="${className}">${formatCurrency(this.getCurrencyFormat, total)}</span>`
    },
  },

  methods: {
    editBalance() {
      this.cashFlow.push({
        id: Date.now(),
        type: this.type,
        amount: parseFloat(this.balance.toString().replace(',', '.'))
      });

      this.balance = "";
    },

    removeRow(index) {
      this.cashFlow.splice(index, 1);
    },

    saveBalance() {
      localStorage.setItem('vue-cash-flow-balance', JSON.stringify({
        'currency': this.currency,
        'cashFlow': this.cashFlow,
      }));
      
      this.flushNotification = false;
      this.saveNotification  = true;
    },

    flushBalance() {
      localStorage.removeItem('vue-cash-flow-balance');

      this.cashFlow = [];
      this.saveNotification  = false;
      this.flushNotification = true;
    },
  },

  mounted() {
    const savedBalance = localStorage.getItem('vue-cash-flow-balance');
    
    if (savedBalance) {
      const { currency, cashFlow } = JSON.parse(savedBalance);
      
      this.cashFlow = cashFlow;
      this.currency = currency;
    }
  },
};
</script>

<style lang="scss" scoped>
  .cash-flow {
    margin-top: 50px;
  }

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