import React from 'react';
import axios from 'axios';
import './App.css';
import { Transaction } from './stories/Transaction';
import { TransactionList } from './stories/TransactionList';

interface AppState {
  transactionsReady: boolean;
  transactions: Transaction[];
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      transactionsReady: false,
      transactions: []};
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/transactions').then(res => {
      const transactions = res.data;
      this.setState({transactionsReady: true, transactions: transactions});
    });
  }

  render() {
    return (
      <div className="App">
        <TransactionList transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default App;
