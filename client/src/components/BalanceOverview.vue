<template>
  <div>
    <h2>Balance Overview</h2>
    <div>
      <strong>Total Income:</strong> {{ totalIncome }}
    </div>
    <div>
      <strong>Total Expense:</strong> {{ totalExpense }}
    </div>
    <div>
      <strong>Net Balance:</strong> {{ netBalance }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalanceOverview',
  props: {
    transactions: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalIncome() {
      return this.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    },
    totalExpense() {
      return this.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    },
    netBalance() {
      return this.totalIncome - this.totalExpense;
    }
  }
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
}
</style>
