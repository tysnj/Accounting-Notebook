import chai = require('chai');
import 'mocha';

import { Balance } from '../../src/models/Balance';
import { Transaction, TransactionType } from '../../src/models/Transaction';

const expect = chai.expect;

describe('Credit transaction model', () => {
  it('Should be an object with value 0 and an empty transaction history on creation', () => {
    const balance = new Balance();
    expect(balance.getValue()).to.equal(0);
    expect(balance.getTransactions().length).to.equal(0);
  });

  it('Should throw en when there are not enough founds for debit but accept credit', () => {
    const balance = new Balance();
    const debit = new Transaction(TransactionType.DEBIT, 1);
    const credit = new Transaction(TransactionType.CREDIT, 1);

    expect(() => balance.apply(debit)).to.throw();
    expect(() => balance.apply(credit)).to.not.throw();
  });

  it('Should accept operations while valid', () => {
    const balance = new Balance();
    const credit1 = new Transaction(TransactionType.CREDIT, 100);
    const debit1 = new Transaction(TransactionType.DEBIT, 10);
    const debit2 = new Transaction(TransactionType.DEBIT, 30);

    expect(() => balance.apply(credit1)).to.not.throw();
    expect(() => balance.apply(debit1)).to.not.throw();
    expect(() => balance.apply(debit2)).to.not.throw();
  });

  it('Should return updated transaction when accepted', () => {
    const balance = new Balance();
    const credit = new Transaction(TransactionType.CREDIT, 100);

    balance.apply(credit);

    expect(credit.id).to.be.a('string');
    expect(credit.effectiveDate).to.be.a('string');
  });

  it('Should return save accepted transactions and update its value', () => {
    const balance = new Balance();
    const credit1 = new Transaction(TransactionType.CREDIT, 100);
    const credit2 = new Transaction(TransactionType.CREDIT, 200);

    // no transactions
    expect(balance.getValue()).to.equal(0);
    expect(balance.getTransactions().length).to.equal(0);

    balance.apply(credit1);
    expect(balance.getValue()).to.equal(100);
    expect(balance.getTransactions().length).to.equal(1);

    balance.apply(credit2);
    expect(balance.getValue()).to.equal(300);
    expect(balance.getTransactions().length).to.equal(2);
  });

  it('Should return transaction when asked with id', () => {
    const balance = new Balance();
    const credit = new Transaction(TransactionType.CREDIT, 100);

    balance.apply(credit);

    const foundTransaction = balance.getTransaction(credit.id as string);
    expect(foundTransaction).to.be.an('object');
  });
});
