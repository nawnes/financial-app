import { shallowMount } from '@vue/test-utils';
import BalanceOverview from '@/components/BalanceOverview.vue';
import axios from 'axios';

jest.mock('axios');

describe('BalanceOverview.vue', () => {
  let wrapper;

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [
      { type: 'income', amount: 100, category: 'Salary' },
      { type: 'expense', amount: 50, category: 'Food' }
    ]});
    wrapper = shallowMount(BalanceOverview);
  });

  it('fetches transactions on created', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.transactions.length).toBe(2);
  });

  it('calculates total income correctly', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.totalIncome).toBe(100);
  });

  it('calculates total expense correctly', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.totalExpense).toBe(50);
  });

  it('calculates balance correctly', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.balance).toBe(50);
  });
});
