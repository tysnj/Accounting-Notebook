import React from 'react';
import axios from 'axios';
import './App.css';
import { Transaction } from './stories/Transaction';
import { TransactionList } from './stories/TransactionList';
import { Box, Button } from '@material-ui/core';

interface AppState {
  transactionsError: boolean;
  transactions: Transaction[];
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      transactionsError: false,
      transactions: [],
    };

    this.reloadTransactions = this.reloadTransactions.bind(this);
  }

  reloadTransactions() {
    axios.get(`http://localhost:8000/api/transactions`).then(res => {
      const transactions = res.data;
      this.setState({transactionsError: false, transactions: transactions});
    }).catch(error => {
      this.setState({transactionsError: true, transactions: []});
      console.error('Something went wrong. You should retry');
      console.error(`Error: ${error}`);
    });
  }

  componentDidMount() {
    this.reloadTransactions();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-header">Accounting Notebook</h1>
        <Button variant="contained" color="primary" onClick={this.reloadTransactions}>Reload</Button>

        <Box className="App-separator"/>

        <div className="App-body">
        {this.state.transactions.length
          ? <TransactionList transactions={this.state.transactions}/>
          : <h2>No transactions yet.<br/>Try reloading from server.</h2>}
        </div>
      </div>
    );
  }
}

export default App;
