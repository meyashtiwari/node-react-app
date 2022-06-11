import CurrentBalance from "../components/CurrentBalance";
import axios from "axios";
import React from "react";
import TransactionsTable from "../components/TransactionsTable";
import TransferBalance from "../components/TransferBalance";
import Notification from "../components/Notification";

const baseURL = `http://localhost:8000/api`;

function MyAccount() {

    const [balance, setBalance] = React.useState(null);
    const [transactionsData, setTransactionsData] = React.useState(null);
    const [accountNumber, setAccountNumber] = React.useState('11111105');
    const [error, setError] = React.useState(null);
    const [showNotification, setShowNotification] = React.useState(false);
    const testAccountNumbers = ['11111105', '11111122', '11111100'];

    React.useEffect(() => {
        fetchData(accountNumber);
    }, [accountNumber]);

    function fetchData(accountNumber) {
        axios.get(`${baseURL}/myaccount/${accountNumber}`).then((response) => {
            setBalance(response.data.currentBalance);
            setTransactionsData(response.data.transactions);
        });
    }

    function transferMoney(data) {
        axios.post(`${baseURL}/pay/`, {
            accountNumber: accountNumber,
            receipientAccountNumber: data.receipientAccountNumber,
            amount: data.amount
        }).then((response) => {
            setError(response.data);
            setShowNotification(true);
            setTimeout(function(){
                setShowNotification(false);
            },10000);
            fetchData(accountNumber);
        });
    }

    function handleAccountChange(childData) {
        setAccountNumber(childData);
    }

    function handleSubmit(data) {
        transferMoney(data);
    }

    return (
        <div>
            <div className="flex justify-center">
                <CurrentBalance balance={balance}/>
            </div>
            <div className="flex justify-center">
                <div className="mt-4">
                <Notification show={showNotification} type={(error?.error === true) ? 'error' : 'success'} message={error?.message} />
                    <TransferBalance 
                        accountNumbers={testAccountNumbers} 
                        handleAccountChange={handleAccountChange} 
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <div>
                    <h1 className="text-center mb-2 font-semibold">My Recent Transactions</h1>
                    <TransactionsTable transactions={transactionsData} />
                </div>
            </div>
        </div>
    );
}
  
export default MyAccount;