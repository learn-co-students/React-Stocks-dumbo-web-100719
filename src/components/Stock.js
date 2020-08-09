import React from 'react'





const Stock = (props) => (
  // ()=>props.buyStock(props.stock)
  <div>

    <div className="card">
      <div className="card-body" >
        <h5 className="card-title">{
            //Company Name
            
           props.stock.name
          }</h5>
        <p className="card-text">{
            //ticker: stock price
            `${props.stock.ticker}: ${props.stock.price}`
          }</p>
          <button onClick={()=>props.handleClick(props.stock)}>press</button>
          
      </div>
    </div>


  </div>
);

// allow a user to buy a stock by clicking on it and when it is bought, it should be added to My Portfolio.

export default Stock
