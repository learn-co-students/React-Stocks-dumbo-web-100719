import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state ={
    stocks: [],
    portfolio: [],
    filterTerm: "All",
    sortTerm: null
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(r => r.json())
    .then((stocks) => {
      this.setState({
        stocks: stocks
      })
    })
  }
  
  buyStock = (stock) => {
    this.setState((prevState) => {
      return {
        portfolio: [stock, ...prevState.portfolio]
      }
    })
  }

  deleteStock = (stock) => {
    let index = this.state.portfolio.indexOf(stock)
    let copyPortfolio = [...this.state.portfolio]
    copyPortfolio.splice(index, 1)
    this.setState({
      portfolio: copyPortfolio
    })
  }

  setFilterTerm = (term) => {
    this.setState({
      filterTerm: term
    })
  }

  setSortTerm = (term) => {
    this.setState({
      sortTerm: term
    })
  }
  

  whichStocksToRender = () => {
    let copiedStocks = [...this.state.stocks]
    if (this.state.filterTerm === "All"){
      copiedStocks = [...this.state.stocks]
    } else {
      copiedStocks = this.state.stocks.filter(stock => stock.type === this.state.filterTerm)
    }
    
    if (this.state.sortTerm === "Price"){
      copiedStocks.sort((stockA, stockB) => {
        return stockB.price - stockA.price
      })
    } else if (this.state.sortTerm === "Alphabetically"){
      copiedStocks.sort((stockA, stockB) => {
        return stockA.name.localeCompare(stockB.name)
      })
    }
    return copiedStocks 
  }
  
  
  render() {
    return (
      <div>
        <SearchBar 
        setFilterTerm={this.setFilterTerm}
        filterTerm={this.state.filterTerm}
        setSortTerm={this.setSortTerm}
        sortTerm={this.state.sortTerm}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
              stocks={this.whichStocksToRender()}
              buyStock={this.buyStock} 
              />

            </div>
            <div className="col-4">

              <PortfolioContainer 
              portfolio={this.state.portfolio} 
              deleteStock={this.deleteStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
