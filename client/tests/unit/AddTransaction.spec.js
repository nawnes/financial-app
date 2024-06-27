import { shallowMount } from '@vue/test-utils';
import AddTransaction from '@/components/AddTransaction.vue';

describe('AddTransaction.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AddTransaction);
  });

  it('renders form and submit button', () => {
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Add');
  });

  it('updates data properties on input', async () => {
    const typeInput = wrapper.find('select');
    const amountInput = wrapper.find('input[type="number"]');
    const categoryInput = wrapper.find('input[type="text"]');

    await typeInput.setValue('expense');
    await amountInput.setValue('50'); // Notez que nous donnons toujours une chaîne ici
    await categoryInput.setValue('Food');

    expect(wrapper.vm.type).toBe('expense');
    expect(parseInt(wrapper.vm.amount)).toBe(50); // Convertir en nombre ici
    expect(wrapper.vm.category).toBe('Food');
  });

  it('calls submitTransaction method on form submit', async () => {
    const submitSpy = jest.spyOn(wrapper.vm, 'submitTransaction');
    await wrapper.find('form').trigger('submit.prevent');
    expect(submitSpy).toHaveBeenCalled();
  });
});
