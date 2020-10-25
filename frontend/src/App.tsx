import React from 'react';
import './App.css';

import { Box, Button } from '@material-ui/core';

import { Transaction } from './components/Transaction';
import { TransactionList } from './components/TransactionList';
import { TransactionsRepository } from './repositories/Transactions';

interface AppState {
  transactionsError: boolean;
  transactions: Transaction[];
}

class App extends React.Component<any, AppState> {
  private transactionsRepository: TransactionsRepository;

  constructor(props: any) {
    super(props);
    this.state = {
      transactionsError: false,
      transactions: [],
    };

    this.transactionsRepository = new TransactionsRepository();
    this.reloadTransactions = this.reloadTransactions.bind(this);
  }

  async reloadTransactions() {
    try {
      const transactions = await this.transactionsRepository.getAll();
      this.setState({transactionsError: false, transactions: transactions});
    } catch (e) {
      this.setState({transactionsError: true, transactions: []});
      console.error(`Error while getting transactions: ${e}`);
    }
  }

  async componentDidMount() {
    await this.reloadTransactions();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-header">Accounting Notebook</h1>
        <Button variant="contained" color="primary" onClick={this.reloadTransactions}>Reload</Button>

        <Box className="App-separator"/>

        <div className="App-body">
          {this.state.transactionsError
            ? <h2>There was an error loading your transactions.<br/>Try again please.</h2>
            : this.state.transactions.length
              ? <TransactionList transactions={this.state.transactions}/>
              : <h2>No transactions received.<br/>Try reloading from server.</h2>}
        </div>
      </div>
    );
  }
}

export default App;
