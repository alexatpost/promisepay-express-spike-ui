import React from 'react';
import axios from 'axios';
import environment from '../../config/environment';

class CustomForm extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            createCardToken: ''
        };
    }
    
    componentDidMount() {
        window.promisepay.createCardAccountForm('promisepay-form', this.handleCardAccountCreated, this.handleFailure);
        const {fullName, email} = this.props.location.query;
        console.log(fullName + email);
        if (fullName && email) {
            axios.post(`${environment.apiUrl}/pp/buyer/card`, {
                // todo post name and email
                full_name: fullName,
                email: email
            }).then((response) => {
                // todo returns buyer id and a generated token
                this.setState({
                    createCardToken: response.data.card_token,
                    buyerId: response.data.buyer_id
                });
            });
        }
    }
    
    handleCardAccountCreated = (data) => {
        console.log(data);
    };
    
    handleFailure = (data) => {
        console.log(data);
    };
    
    render() {
        const style={display: 'none'};

        console.log(this.props);
        return (
            <form id="promisepay-form" autoComplete="on" action="payment">

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

                <input id="cardToken" type="hidden" data-promisepay-card-token={this.state.createCardToken} className="input"/>

                <p className="promisepay-server-error" style={style}></p>

                <p className="control">
                    <input type="submit" className="button is-primary is-pulled-right"/>
                </p>
            </form>
        );
    }
}

export default CustomForm;