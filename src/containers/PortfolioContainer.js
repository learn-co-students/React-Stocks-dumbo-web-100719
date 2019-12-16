import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {


  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.portfolio.map((stockObj, index) => {
              return <Stock
                stock={stockObj}
                key={`${stockObj.name} - ${index}`}
                //we set up key like this because if we just do stockObj.id and click fb twice it will ahve 2 stocks in porfiolio w id "2"
                handleClick={this.props.removeStock}
              />
            }
            )
          }
      </div>
    );
  }

}

export default PortfolioContainer;
