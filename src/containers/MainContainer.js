import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    filter: '',
    sortTerm: "Alphabetically"
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
      .then(response => response.json())
      .then(stocks => this.setState({ stocks }))
      .catch(errors => console.log(errors))
  }

  pickStock = (pickedStock) => {
    this.setState((prevState) => {
      if (prevState.portfolio.find(stock => stock.id === pickedStock.id)){
        let filteredPortfolio = prevState.portfolio.filter(stock => stock.id !== pickedStock.id)
        return {portfolio: [...filteredPortfolio]}
      } else {
        return {portfolio: [...prevState.portfolio, pickedStock]}
      }
    })
  }

  setFilter = (filterWord) => {
    this.setState({filter: filterWord})
  }

  setSortTerm = (term) => {
    this.setState({sortTerm: term})
  }
  

  // sortAlpha = (event) => {
  //   console.log(event.target.value) 
  //   // this.setState({filter: filterWord})
  // }

  // sortPrice = (event) => {
  //   console.log(event.target.value)
  //   // this.setState({filter: filterWord})
  // }

  filteredStocks = () => {
    let copiedStocks = this.state.stocks.filter(stock => stock.type.includes(this.state.filter))

    if (this.state.sortTerm === "Alphabetically") {
      copiedStocks.sort((stockA, stockB) => {
        return stockA.name.localeCompare(stockB.name)
      })
    } else {
      copiedStocks.sort((stockA, stockB) => {
        return stockA.price - stockB.price
      })
    }

    return copiedStocks 
  }

  render() {
    // console.log("Main container", this.state.sortTerm)
    return (
      <div>
        <SearchBar
          setFilter={this.setFilter}
          term={this.state.filter}
          setSortTerm={this.setSortTerm}
          sortTerm={this.state.sortTerm}
          // sortAlpha={this.sortAlpha}
          // sortPrice={this.sortPrice}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks={this.filteredStocks()}
                pickStock={this.pickStock}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                portfolio={this.state.portfolio}
                pickStock={this.pickStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
