import React, {Component} from 'react';
import Payment from './Payment/Payment';
import CustomForm from './CustomForm/CustomForm';

import 'bulma/css/bulma.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <nav className="nav">
                    <div className="nav-left">
                        <h2 className="nav-item title">PromisePay Express Spike</h2>
                    </div>
                </nav>
                <div className="section">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
