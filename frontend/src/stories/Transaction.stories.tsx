import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Transaction, TransactionProps, TransactionType } from './Transaction';

export default {
  title: 'Notebook/Transaction',
  component: Transaction,
} as Meta;

const Template: Story<TransactionProps> = (args) => <Transaction {...args}/>;

export const Credit = Template.bind({});
Credit.args = {
  transaction: {
    id: '987e057d-fb96-4c98-8fdc-907ea7854eb7',
    type: TransactionType.CREDIT,
    amount: 100,
    effectiveDate: '2020-10-12T23:56:39.607Z',
  }
};

export const Debit = Template.bind({});
Debit.args = {
  transaction: {
    id: '987e057d-fb96-4c98-8fdc-907ea7854eb7',
    type: TransactionType.DEBIT,
    amount: 50,
    effectiveDate: '2020-10-12T23:56:39.607Z',
  }
};
