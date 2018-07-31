import React from 'react';
import Header from './Header.js';
import Order from './Order.js';
import Inventory from './Inventory.js';
import Fish from './Fish.js';
import sampleFishes from '../sample-fishes.js';
import base from '../base.js';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const {params} = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };
    componentDidUpdate() {
        const {params} = this.props.match;
        localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
    };
    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({fishes});
    };
    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    };
    deleteFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    };
    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    };
    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order});
    };
    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    };
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} />
                <Inventory fishes={this.state.fishes} addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;