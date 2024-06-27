<template>
  <li>
    {{ transaction.type }} - {{ transaction.amount }} - {{ transaction.category }}
  </li>
</template>

<script>
export default {
  name: 'TransactionItem',
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
li {
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  color: #333;
}

li:hover {
  background: #e0e0e0;
}
</style>
