import React from 'react';
import axios from 'axios';
import environment from '../../config/environment';

class CustomForm extends React.Component {
    
    componentWillMount() {
        axios.post(`${environment.apiUrl}/pp/buyer/card`, {
            // todo post name and email
        }).then((response) => {
            // todo returns buyer id and a generated token
        });
    }
    
    componentDidMount() {
        window.promisepay.createCardAccountForm('promisepay-form', this.handleCardAccountCreated, this.handleFailure);
    }
    
    handleCardAccountCreated = (data) => {
        console.log(data);
    };
    
    handleFailure = (data) => {
        console.log(data);
    };
    
    render() {
        return (
            <form id="promisepay-form" autoComplete="on" action="payment">
                <label className="label">Email</label>
                <p className="control">
                    <input id="email" type="text" placeholder="Email" className="input"/>
                </p>

                <label className="label">Full name</label>
                <p className="control">
                    <input id="fullName" type="text" placeholder="Full Name" data-promisepay-encrypted-name="cardName"
                           className="input"/>
                </p>

                <label className="label">Card number</label>
                <p className="control">
                    <input type="tel" placeholder="Card Number" data-promisepay-encrypted-name="cardNumber"
                           className="input"/>
                </p>

                <label className="label">Expiry Date (MM/YY)</label>
                <p className="control">
                    <input type="tel" placeholder="Exp. Date (MM/YY)"
                           data-promisepay-encrypted-name="cardExpiryDate" className="input"/>
                </p>

                <label className="label">CVC</label>
                <p className="control">
                    <input type="text" placeholder="CVV" autoComplete="off"
                           data-promisepay-encrypted-name="cardCVC" className="input"/>
                </p>

                <input id="cardToken" type="hidden" data-promisepay-card-token="GENERATED_TOKEN" className="input"/>

                <p className="promisepay-server-error" style={style}></p>

                <p className="control">
                    <input type="submit" className="button is-primary is-pulled-right"/>
                </p>
            </form>
        );
    }
}

export default CustomForm;