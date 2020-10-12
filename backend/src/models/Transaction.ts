import { v4 as uuidv4 } from 'uuid';

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit'
}

export interface TransactionInterface {
  id: string | null;
  type: TransactionType;
  amount: number | null;
  effectiveDate: string | null;
}

export class Transaction implements TransactionInterface {
  public type: TransactionType;
  public amount: number;
  public id: string | null;
  public effectiveDate: string | null;

  constructor(type: TransactionType, amount: number) {
    this.type = type;
    this.amount = amount;
    this.id = null;
    this.effectiveDate = null;
  }

  static fromJSON(json: any){
    if (json
      && typeof json.type === 'string' && (json.type === TransactionType.CREDIT || json.type === TransactionType.DEBIT)
      && typeof json.amount === 'number' && json.amount > 0)
    return new Transaction(json.type, json.amount);

    throw new Error('Invalid JSON');
  }

  public isConfirmed(): boolean {
    return (!!this.id && !!this.effectiveDate);
  }

  public confirm() {
    this.id = uuidv4();
    this.effectiveDate = new Date().toISOString();
  }

}
