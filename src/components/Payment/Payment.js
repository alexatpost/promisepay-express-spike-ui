import React from 'react';
import axios from 'axios';
import environment from '../../config/environment';

class Payment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            number: '4111111111111111',
            expiryMonth: '12',
            expiryYear: '2020',
            cvv: '999',
            buyerId: '',
            paymentToken: '',
            ipAddress: '',
            deviceId: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${environment.apiUrl}/pp/buyer/card`,
            {
                full_name: this.state.fullName,
                email: this.state.email
            }
        ).then((response) => {
            this.setState({
                buyerId: response.data.buyer_id
            });
            window.promisepay.createCardAccount(response.data.card_token, {
                full_name: this.state.fullName,
                number: this.state.number,
                expiry_month: this.state.expiryMonth,
                expiry_year: this.state.expiryYear,
                cvv: this.state.cvv
            }, this.handleSuccess, this.handleFailure);
        });

    };

    handleSuccess = (data) => {
        console.log(data);
        axios.post(`${environment.apiUrl}/pp/order`,
            {
                buyer_id: this.state.buyerId,
                payment_token: data.id,
                item_name: 'Some nice food',
                amount: '10000',
                ip_address: this.state.ipAddress,
                device_id: this.state.deviceId
            }
        ).then((orderResponse) => {
            console.log(orderResponse);
            alert('Your order is now: ' + orderResponse.data);
        });
    };

    handleFailure = (data) => {
        console.log(data);
    };

    handleDeviceIdCapture = (data) => {
        console.log('device id captured ===> ' + data);
        this.setState({
            deviceId: data
        });
    };

    handleIpAddressCapture = (data) => {
        console.log('ip address captured ===> ' + data);
        this.setState({
            ipAddress: data
        })
    };

    componentWillMount() {
        window.promisepay.configure('prelive');
        window.promisepay.captureDeviceId(this.handleDeviceIdCapture);
        window.promisepay.getIPAddress(this.handleIpAddressCapture);
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <label className="label">Email</label>
                <p className="control">
                    <input type="text" placeholder="Email" className="input" onChange={(event) => this.setState({email: event.target.value})}/>
                </p>

                <label className="label">Full name</label>
                <p className="control">
                    <input type="text" placeholder="Full Name" className="input" onChange={(event) => this.setState({fullName: event.target.value})}/>
                </p>

                <label className="label">Card number</label>
                <p className="control">
                    <input type="tel" placeholder="Card Number" className="input" onChange={(event) => this.setState({number: event.target.value})} value="4111111111111111"/>
                </p>

                <label className="label">Expiry Month</label>
                <p className="control">
                    <input type="tel" placeholder="Exp. Month" className="input" onChange={(event) => this.setState({expiryMonth: event.target.value})} value="12"/>
                </p>

                <label className="label">Expiry Year</label>
                <p className="control">
                    <input type="tel" placeholder="Exp. Year" className="input" onChange={(event) => this.setState({expiryYear: event.target.value})} value="2020"/>
                </p>

                <label className="label">CVC</label>
                <p className="control">
                    <input type="text" placeholder="CVV" autoComplete="off" className="input" onChange={(event) => this.setState({cvv: event.target.value})} value="999"/>
                </p>

                <p className="control">
                    <input type="submit" className="button is-primary is-pulled-right"/>
                </p>
            </form>
        );
    }
}

export default Payment;