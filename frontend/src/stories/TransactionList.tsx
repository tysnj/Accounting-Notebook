import React from 'react';
import './TransactionList.css';
import { Transaction } from './Transaction';

export interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({transactions}) => {
  const elements = transactions.map(t => <Transaction key={t.id} transaction={t} />);

  return (
    <div>
      {elements}
    </div>
  )
}
