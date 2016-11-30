import React from 'react';
import axios from 'axios';
import environment from '../../config/environment';

class Receipt extends React.Component {

    componentDidMount() {
        axios.post(`${environment.apiUrl}/pp/order`,
            {
                buyer_id: this.state.buyerId,
                payment_token: this.location.query.promisePayCardName,
                item_name: 'Some nice food',
                amount: '10000',
                ip_address: this.state.ipAddress,
                device_id: this.state.deviceId
            }
        ).then((orderResponse) => {
            console.log(orderResponse);
            alert('Your order is now: ' + orderResponse.data);
        });
    }
    render() {
        console.log(this.props);
        return (
            <div>Receipt</div>
        );
    }
}

export default Receipt;