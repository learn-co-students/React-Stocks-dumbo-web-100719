import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state={
    stocks: [],
    portfolio: [],
    filterTerm: "All",
    sortTerm: ""
  }

  buyStock = (stockObj) => {
    this.setState((prevState) => {
      return {
        portfolio: [...prevState.portfolio, stockObj]
      }
    })
  }

  removeStock = (stockObj) => {
    let index = this.state.portfolio.indexOf(stockObj)
    let arr = [...this.state.portfolio]
    arr.splice(index, 1)

    this.setState({
      portfolio: arr
    })
  }

  setFilterTerm = (term) => {
    this.setState({
      filterTerm: term
    })
  }

  setSortTerm = (term) => {
    this.setState({
      sortTerm : term
    })
  }
  

  whichArray = () => {
    let filteredArray = [...this.state.stocks]
    filteredArray = this.state.filterTerm === "All" ? [...this.state.stocks] : filteredArray.filter(stock => stock.type === this.state.filterTerm)
    
    if (this.state.sortTerm === "Alphabetically") {
      return filteredArray.sort((stockA, stockB) => stockA.name.localeCompare(stockB.name) 
      )
    } 
    else if (this.state.sortTerm === "Price") {
      return filteredArray.sort((stockA, stockB) => stockA.price - stockB.price)
    }
    return filteredArray
  }
  
  
  

  componentDidMount() {
    fetch(`http://localhost:3000/stocks`)
    .then(resp => resp.json())
    .then(data => this.setState({stocks: data}))
  }

  render() {
    return (
      <div>
        <SearchBar setFilterTerm={this.setFilterTerm} filterTerm={this.state.filterTerm} setSortTerm={this.setSortTerm} sortTerm={this.state.sortTerm}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.whichArray()} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} removeStock={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
