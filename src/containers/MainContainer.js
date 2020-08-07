import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
	state = {
		boughtStocks: []
	};
	buyStock = stockObj => {
		this.setState({
			boughtStocks: [...this.state.boughtStocks, stockObj]
		});
	};

	sellStock = id => {
		let newStockArr = this.state.boughtStocks.filter(stock => stock.id !== id);
		this.setState({
			boughtStocks: newStockArr
		});
	};

	render() {
		return (
			<div>
				<SearchBar
					sortStocks={this.props.sortStocks}
					filterStocks={this.props.filterStocks}
				/>

				<div className="row">
					<div className="col-8">
						<StockContainer
							stocks={this.props.stocks}
							buyStock={this.buyStock}
						/>
					</div>
					<div className="col-4">
						<PortfolioContainer
							boughtStocks={this.state.boughtStocks}
							sellStock={this.sellStock}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default MainContainer;
