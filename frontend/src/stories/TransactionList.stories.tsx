import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { TransactionList, TransactionListProps } from '../components/TransactionList';
import { TransactionType } from '../components/Transaction';

export default {
  title: 'Notebook/TransactionList',
  component: TransactionList
} as Meta;

const Template: Story<TransactionListProps> = (args) => <TransactionList {...args}/>

export const List = Template.bind({});
List.args = {
  transactions: [
    {
      id: '987e057d-fb96-4c98-8fdc-907ea7854eb7',
      type: TransactionType.CREDIT,
      amount: 100,
      effectiveDate: '2020-10-12T23:56:39.607Z',
    },
    {
      id: '987e057d-fb96-4c98-8fdc-907ea7854eb7',
      type: TransactionType.DEBIT,
      amount: 50,
      effectiveDate: '2020-10-12T23:56:39.607Z',
    }
  ]
}
