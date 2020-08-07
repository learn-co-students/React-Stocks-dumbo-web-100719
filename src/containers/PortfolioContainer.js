import React, { Component } from "react";

import PortfolioList from "../components/PortfolioList";

class PortfolioContainer extends Component {
	render() {
		return (
			<div>
				<h2>My Portfolio</h2>
				{this.props.boughtStocks.map(stock => (
					<PortfolioList
						key={stock.id}
						stock={stock}
						sellStock={this.props.sellStock}
					/>
				))}
			</div>
		);
	}
}

export default PortfolioContainer;
