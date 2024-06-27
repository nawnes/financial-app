<template>
  <div>
    <h2>Transactions</h2>
    <ul>
      <transaction-item v-for="transaction in transactions" :key="transaction._id" :transaction="transaction" />
    </ul>
  </div>
</template>

<script>
import TransactionItem from './TransactionItem.vue';

export default {
  name: 'TransactionList',
  components: {
    TransactionItem
  },
  props: {
    transactions: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
