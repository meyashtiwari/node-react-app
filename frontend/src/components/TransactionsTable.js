function TransactionsTable (props) {
    
    return(    
        <table className="table p-4 bg-white shadow rounded-lg">
            <thead>
                <tr>
                    <th className="border font-bold p-4 dark:border-dark-5 whitespace-nowrap text-gray-900">
                        #
                    </th>
                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                        Date
                    </th>
                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                        Account Number
                    </th>
                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                        Amount
                    </th>
                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                        Balance
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    props?.transactions?.map((transaction, index) => {
                        return (<tr key={index} className="text-gray-700">
                                    <td className="border font-bold p-4 dark:border-dark-5">
                                        { index+1 }
                                    </td>
                                    <td className="border p-4 dark:border-dark-5">
                                        { new Date(transaction.transactionDate).toLocaleDateString() }
                                    </td>
                                    <td className="border p-4 dark:border-dark-5">
                                        { transaction.transactionAccountNumber }
                                    </td>
                                    <td className="border p-4 dark:border-dark-5">
                                        { (parseFloat(transaction.transactionAmount.$numberDecimal) > 0) ? '+' : '' }
                                        {  
                                            parseFloat(transaction.transactionAmount.$numberDecimal)
                                        }
                                    </td>
                                    <td className="border p-4 dark:border-dark-5">
                                        { parseFloat(transaction.currentAccountBalance.$numberDecimal) }
                                    </td>
                                </tr>)
                    })
                }
            </tbody>
        </table>

    );
}

export default TransactionsTable;