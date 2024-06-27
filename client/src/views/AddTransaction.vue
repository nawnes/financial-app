<template>
  <div class="add-transaction-container">
    <div class="add-transaction-box">
      <h2>Add Transaction</h2>
      <form @submit.prevent="addTransaction">
        <div class="input-group">
          <label for="type">Type</label>
          <select v-model="type" id="type" @change="updateCategories" required>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div class="input-group">
          <label for="amount">Amount</label>
          <input type="number" v-model="amount" id="amount" required placeholder="Enter amount">
        </div>

        <div class="input-group">
          <label for="category">Category</label>
          <select v-model="category" id="category" required>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>

        <div class="actions">
          <button type="submit" class="btn">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      type: 'income',
      amount: '',
      category: '',
      categories: []
    };
  },
  created() {
    this.updateCategories();
  },
  methods: {
    async addTransaction() {
      try {
        await axios.post('http://localhost:3000/api/transactions', {
          type: this.type,
          amount: this.amount,
          category: this.category
        });
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
    updateCategories() {
      if (this.type === 'income') {
        this.categories = ['Salary', 'Bonus', 'Investment', 'Other'];
      } else {
        this.categories = ['Food', 'Rent', 'Utilities', 'Transport', 'Entertainment', 'Healthcare', 'Other'];
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Open Sans', sans-serif;
}

.add-transaction-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.add-transaction-box {
  background: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: #fff;
  cursor: pointer;
}

.actions .btn:hover {
  background: linear-gradient(135deg, #5a77d7, #8958b4);
}
</style>