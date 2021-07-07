import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'


class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    filterTerm: "All",
    sortTerm: ""
  }

  //in order to pass something from a child comp to a parent we need to create
  //a function in parent that we can pass down to the child

  setSortTerm = (term) => {
    this.setState({
      sortTerm: term
    })
  }


  setFilterTerm = (term) => {
    this.setState({
      filterTerm: term
    })
  }

  buyStock = (stockObj) => {
    this.setState((previousState) => {
      return {
        portfolio: [stockObj, ...previousState.portfolio ]
      }
    }
    )
    //this is the same as: this.setState(portfolio: [stockObj, ...this.state.portfolio])
  }

  //what is on the DOM is based on my state, i change the state I change the DOM

  removeStock = (stockObj) => {
    let index = this.state.portfolio.indexOf(stockObj)
    let copyP = [...this.state.portfolio]
    copyP.splice(index, 1)
    this.setState({
      portfolio: copyP
    })
  }

  whichStocksToRender = () => {
    let copiedStocks = [...this.state.stocks]
    
    if (this.state.filterTerm === "All") {
      copiedStocks = this.state.stocks
    } else {
      copiedStocks =  this.state.stocks.filter(stock => stock.type === this.state.filterTerm)
    }

    if (this.state.sortTerm === "Price") {
      copiedStocks.sort((stockA, stockB) => {
        return stockA.price - stockB.price
      })
    } else if (this.state.sortTerm === "Alphabetically") {
      copiedStocks.sort((stockA, stockB) => {
        return stockA.name.localeCompare(stockB.name)
      })
    }
    return copiedStocks
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(r => r.json())
      .then((stocksArr) => {
        this.setState({
          stocks: stocksArr
        })
      }
      
      )
}


  render() {
    console.log("Maincontainer", this.state)
    return (
      <div>
        <SearchBar setFilterTerm={this.setFilterTerm}
          term={this.state.filterTerm}
          setSortTerm={this.setSortTerm}
          sortTerm={this.state}/>

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
              removeStock={this.removeStock}
            />
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
