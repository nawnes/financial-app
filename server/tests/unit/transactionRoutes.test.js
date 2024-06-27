const request = require('supertest');
const app = require('../index'); // Assurez-vous que ce chemin est correct
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

describe('Transaction API', () => {
  beforeAll(async () => {
    // Setup code if necessary
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .send({
        type: 'income',
        amount: 100,
        category: 'Salary',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all transactions', async () => {
    const res = await request(app).get('/api/transactions');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
