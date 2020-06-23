import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }
  public getBalance(): Balance {
    const balanceIncome = this.transactions.filter(
      item => item.type == 'income',
    );
    const balanceOutcome = this.transactions.filter(
      item => item.type == 'outcome',
    );
    const totalIncome = balanceIncome.reduce((total, trans) => {
      return total + trans.value;
    }, 0);

    const totalOutcome = balanceOutcome.reduce((total, trans) => {
      return total + trans.value;
    }, 0);

    const totalValueTrans = this.transactions.reduce((total, trans) => {
      return total + trans.value;
    }, 0);

    this.balance.income = totalIncome;
    this.balance.outcome = totalOutcome;
    this.balance.total = totalIncome - totalOutcome;

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
