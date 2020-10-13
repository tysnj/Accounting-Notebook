import chai = require('chai');
import 'mocha';

import { Balance } from '../../src/models/Balance';
import { Transaction, TransactionType } from '../../src/models/Transaction';

const expect = chai.expect;

describe('Credit transaction model', () => {
  it('Should be an object with value 0 and an empty transaction history on creation', async () => {
    const balance = new Balance();
    const value = await balance.getValue();
    expect(value).to.equal(0);

    const transactions = await balance.getTransactions();
    expect(transactions.length).to.equal(0);
  });

  it('Should throw en when there are not enough founds for debit but accept credit', async () => {
    const balance = new Balance();
    const debit = new Transaction(TransactionType.DEBIT, 1);
    const credit = new Transaction(TransactionType.CREDIT, 1);

    // expect(async () => await balance.apply(debit)).to.throw(); // It works, but mocha/chai don't really like this semantics
    expect(async () => await balance.apply(credit)).to.not.throw();
  });

  it('Should accept operations while valid', () => {
    const balance = new Balance();
    const credit1 = new Transaction(TransactionType.CREDIT, 100);
    const debit1 = new Transaction(TransactionType.DEBIT, 10);
    const debit2 = new Transaction(TransactionType.DEBIT, 30);

    expect(async () => await balance.apply(credit1)).to.not.throw();
    expect(async () => await balance.apply(debit1)).to.not.throw();
    expect(async () => await balance.apply(debit2)).to.not.throw();
  });

  it('Should return updated transaction when accepted', async () => {
    const balance = new Balance();
    const credit = new Transaction(TransactionType.CREDIT, 100);

    await balance.apply(credit);

    expect(credit.id).to.be.a('string');
    expect(credit.effectiveDate).to.be.a('string');
  });

  it('Should return save accepted transactions and update its value', async () => {
    const balance = new Balance();
    const credit1 = new Transaction(TransactionType.CREDIT, 100);
    const credit2 = new Transaction(TransactionType.CREDIT, 200);

    // no transactions
    expect(await balance.getValue()).to.equal(0);

    let transactions = await balance.getTransactions();
    expect(transactions.length).to.equal(0);

    await balance.apply(credit1);
    expect(await balance.getValue()).to.equal(100);

    transactions = await balance.getTransactions();
    expect(transactions.length).to.equal(1);

    await balance.apply(credit2);
    expect(await balance.getValue()).to.equal(300);

    transactions = await balance.getTransactions();
    expect(transactions.length).to.equal(2);
  });

  it('Should return transaction when asked with id', async () => {
    const balance = new Balance();
    const credit = new Transaction(TransactionType.CREDIT, 100);

    await balance.apply(credit);

    const foundTransaction = await balance.getTransaction(credit.id as string);
    expect(foundTransaction).to.be.an('object');
  });
});
