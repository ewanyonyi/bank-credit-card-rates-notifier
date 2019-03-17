import React, {Component} from 'react';
import './App.css';
import axios from "axios";
import ReactNotifications from "react-browser-notifications";

class App extends Component {

    state = {
        data: [],
        aprRate: 0.0,
        legalName: '',
        trademarkID: '',
        demoBankRate: 100.69
        //test commit 1 with zak
        //test commit 2 with zak
        //test commit 3 with zak
    };

    componentDidMount() {
        axios.get(`https://api-dev.capitalone.co.uk/open-banking/v1/consumer-credit-cards`)
            .then(res => {

                const aprRate = res.data.data[0].Details.ConsumerCreditCardItem.APRRate;
                const legalName = res.data.data[0].Organisation.ParentOrganisation.OrganisationName.LegalName;
                const trademarkID = res.data.data[0].Organisation.Brand.TrademarkID;

                this.setState({aprRate: aprRate});
                this.setState({legalName: legalName});
                this.setState({trademarkID: trademarkID});

                if (aprRate > this.state.demoBankRate) {
                    this.showNotifications();
                }
            });
        setInterval(() => {
            axios.get(`https://api-dev.capitalone.co.uk/open-banking/v1/consumer-credit-cards`)
                .then(res => {

                    const aprRate = res.data.data[0].Details.ConsumerCreditCardItem.APRRate;
                    const legalName = res.data.data[0].Organisation.ParentOrganisation.OrganisationName.LegalName;
                    const trademarkID = res.data.data[0].Organisation.Brand.TrademarkID;

                    this.setState({aprRate: aprRate});
                    this.setState({legalName: legalName});
                    this.setState({trademarkID: trademarkID});

                    if (aprRate > this.state.demoBankRate) {
                        this.showNotifications();
                    }
                })
        }, 10000);
    }

    showNotifications() {
        if (this.n.supported()) this.n.show();
    }

    handleClick(event) {
        // window.focus()
        // window.open("http://www.google.com")
        this.n.close(event.target.tag);
    }

    render() {

        const {aprRate, legalName, trademarkID} = this.state;

        return (
            <div className="App">

                Annual Percentage Rate: <b>{aprRate}%</b>

                <ReactNotifications
                    onRef={ref => (this.n = ref)}
                    title={legalName}
                    body={"Current Rate: " + aprRate + "%"}
                    icon="https://www.capitalone.co.uk/developer/api/images/logo.png"
                    tag={trademarkID}
                    timeout="2000"
                    onClick={event => this.handleClick(event)}
                />

            </div>
        );
    }

}

export default App;
