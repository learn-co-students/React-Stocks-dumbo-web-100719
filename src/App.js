import React, { Component } from "react";
import Header from "./components/Header";
import MainContainer from "./containers/MainContainer";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stocks: [],
			displayStocks: []
		};
	}

	// fetching
	componentDidMount() {
		fetch("http://localhost:3000/stocks")
			.then(res => res.json())
			.then(stockData =>
				this.setState({ stocks: stockData, displayStocks: stockData })
			);
	}
	sortStocks = evt => {
		console.log(evt);
		switch (evt) {
			case "Alphabetically":
				let alphaSort = this.state.stocks.sort((stock1, stock2) =>
					stock1.name.localeCompare(stock2.name)
				);
				this.setState({
					displayStocks: alphaSort
				});
				break;
			case "Price":
				let priceSort = this.state.stocks.sort(
					(stock1, stock2) => stock1.price - stock2.price
				);
				this.setState({
					displayStocks: priceSort
				});
				break;

			default:
				break;
		}
	};

	filterStocks = evt => {
		switch (evt) {
			case "Tech":
				let techStocks = this.state.stocks.filter(
					stocks => stocks.type === evt
				);
				this.setState({
					displayStocks: techStocks
				});
				break;
			case "Sportswear":
				let sportStocks = this.state.stocks.filter(
					stocks => stocks.type === evt
				);
				this.setState({
					displayStocks: sportStocks
				});
				break;
			case "Finance":
				let financeStocks = this.state.stocks.filter(
					stocks => stocks.type === evt
				);
				this.setState({
					displayStocks: financeStocks
				});
				break;
			case "All":
				this.setState({
					displayStocks: this.state.stocks
				});
				break;

			default:
				break;
		}
	};

	render() {
		return (
			<div>
				<Header />
				<MainContainer
					stocks={this.state.displayStocks}
					sortStocks={this.sortStocks}
					filterStocks={this.filterStocks}
				/>
			</div>
		);
	}
}

export default App;
