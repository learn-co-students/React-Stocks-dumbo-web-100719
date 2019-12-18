import React, { Component } from "react";
import Header from "./components/Header";
import MainContainer from "./containers/MainContainer";

const url = "http://localhost:3000/stocks";
class App extends Component {
  state = {
    stocks: [],
    portfolio: [],
    displayStocks: []
  };

  componentDidMount() {
    fetch(url)
      .then(resp => resp.json())
      .then(data => this.setState({ stocks: data, displayStocks: data }))
      .catch(error => {
        console.error(error);
      });
  }

  addStockToPortfolio = stock => {
    console.log(stock);
    !this.state.portfolio.includes(stock)
      ? this.setState(prevState => {
          return {
            portfolio: [...prevState.portfolio, stock]
          };
        })
      : null;
  };

  removeStockFromPortfolio = stock => {
    console.log(stock);
    const stockToRemove = this.state.portfolio.filter(s => s !== stock);
    this.setState({
      portfolio: stockToRemove
    });
  };

  handleAlphaSort = () => {
    const sortedStocks = this.state.stocks.sort((stockA, stockB) =>
      stockA.name > stockB.name ? 1 : -1
    );
    this.setState({
      displayStocks: sortedStocks
    });
  };

  handleNumSort = () => {
    const sortedStocks = this.state.stocks.sort((stockA, stockB) =>
      stockA.price > stockB.price ? 1 : -1
    );
    this.setState({
      displayStocks: sortedStocks
    });
  };

  handleFilter = filter => {
    console.log(filter);
    if (filter.toLowerCase() === "all") {
      this.setState({
        displayStocks: this.state.stocks
      });
    } else {
      this.setState({
        displayStocks: this.state.stocks.filter(s => s.type === filter)
      });
    }
  };

  render() {
    const { stocks, portfolio, displayStocks } = this.state;
    return (
      <div>
        <Header />
        <MainContainer
          stocks={displayStocks}
          portfolio={portfolio}
          addStockToPortfolio={this.addStockToPortfolio}
          removeStockFromPortfolio={this.removeStockFromPortfolio}
          displayStocks={displayStocks}
          handleAlphaSort={this.handleAlphaSort}
          handleNumSort={this.handleNumSort}
          handleFilter={this.handleFilter}
        />
      </div>
    );
  }
}

export default App;
