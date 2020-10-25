import React from 'react';
import './Transaction.css';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit'
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  effectiveDate: string;
}

export interface TransactionProps {
  transaction: Transaction;
}

export const Transaction: React.FC<TransactionProps> = ({transaction}) => {
  return (
    <Accordion className="transaction">
      <AccordionSummary className="transaction-header" expandIcon={<ExpandMoreIcon />}>
        <p className={`transaction-${transaction.type}`}><span>Transaction:</span> {transaction.amount} ({transaction.type})</p>
      </AccordionSummary>
      <AccordionDetails className="transaction-body" >
        <p><span>Type:</span> {transaction.type}</p>
        <p><span>Amount:</span> {transaction.amount}</p>
        <p><span>Date:</span> {transaction.effectiveDate}</p>
        <p><span>Id:</span> {transaction.id}</p>
      </AccordionDetails>
    </Accordion>
  );
}
