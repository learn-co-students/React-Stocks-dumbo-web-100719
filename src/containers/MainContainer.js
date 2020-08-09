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

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(r => r.json())
    .then((stocksArr) => {
      // console.log(stocksArr)
      this.setState({
        stocks: stocksArr
      }) 

    })

  }

  buyStock = (stock) => {
    // console.log(stock)


    this.setState({
      
      portfolio:[...this.state.portfolio, stock]
      
    })
    // console.log(stock)
  }

  sellStock = (stock) => {
    // console.log("sold",stock)
    // let soldStockPortfolio = this.state.portfolio.pop(stock)
    let filteredPortfolio = this.state.portfolio.filter((stockObj) => {
        stock.id !== stockObj.id
    }
    )
    this.setState({
      
      portfolio: filteredPortfolio
      
    })
    // console.log(filteredPortfolio)
  }

  setFilterTerm = (term) => { 
    // console.log(userSearch)
   this.setState({

     filterTerm: term

   })
  }
  
  setSortTerm = (term) => {
    console.log(term)
    this.setState({
      sortTerm: term
    })
  }
  

  wichstock = () => {

    // console.log()
    let stocks = [...this.state.stocks]
    if (this.state.filterTerm === "All") {
       stocks = [...this.state.stocks]
    } else {
       stocks = this.state.stocks.filter(stock => stock.type === this.state.filterTerm)
    }
     
    if (this.state.sortTerm === "Alphabetically") {
       stocks.sort((stockA, stockB) => {
       return stockA.name.localeCompare(stockB.name) 
       }
       )
    } else if(this.state.sortTerm === "Price"){
      stocks.sort((stockA, stockB) => {
        return stockA.price - stockB.price
      })
    }
   return stocks
  }
  
  
  
  
  // allow a user to buy a stock by clicking on it and when it is bought, it should be added to My Portfolio.
  
  
  render() {
    // console.log(this.state.stocks)
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
              stocks={this.wichstock()} 
              buyStock={this.buyStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer 
              portfolio={this.state.portfolio} 
              sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
