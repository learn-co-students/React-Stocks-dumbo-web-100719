import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
constructor() {
  super()
  this.state={
    stocks: [],
    portfolioStocks: [],
    showStocks: []

  }
}

  componentDidMount(){
   fetch(`http://localhost:3000/stocks`)
  .then(resp => resp.json())
  .then(data => this.setState({
    stocks: data,
    showStocks: data
  }))
  }

  addPortfolio = (stock) => {
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock]
    })
  }

  removePortfolio =(stock) => {
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(s=> s !== stock) })
  }

  filteredStocks=(type) => {
    if(type !== 'All'){
      this.setState({
        showStocks: this.state.stocks.filter(s=> 
        s.type === type)
      })
    }else{
      this.setState({
        showStocks: this.state.stocks
      })
    }
  }
  
  
  

  sortStocks=(sortBy) => {
    let array = []
    switch(sortBy){
      case "Alphabetically":
      array = this.state.showStocks.sort((a,b) => a.name > b.name  ? 1:-1)
        break;
      case "Price":
        array = this.state.showStocks.sort((a,b)=> a.price>b.price ? 1:-1)
        break
      default:
        console.log("wrong choice")
    }
    this.setState({
      showStocks: array
    })
    

  }
  
  
  
  
  
  render() {
    // debugger
    return (
      <div>
        <SearchBar
        sortedStocks={this.sortStocks}
        filteredStocks={this.filteredStocks}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
              stocks={this.state.showStocks}
              addPortfolio={this.addPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer
              portfolioStocks={this.state.portfolioStocks}
              removeStock={this.removePortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
