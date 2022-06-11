import { useState } from 'react'

function TransferBalance (props) {

    const [inputs, setInputs] = useState({});

    function accountChange(value) {
        props.handleAccountChange(value);
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        props.handleSubmit(inputs);
        event.target.receipientAccountNumber.value = '';
        event.target.amount.value = ''
    }

    return (
        
        <div class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
            <div class="mt-2">
                <form onSubmit={handleFormSubmit} autoComplete="off">
                    <div class="flex flex-col mb-2">
                        <div class="flex relative items-center">
                            <label class="mr-2">Pay from</label>
                            <select
                             onChange={(e) => accountChange(e.target.value)}
                             class="block flex-1 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="account">
                                {
                                    props.accountNumbers.map((accountNumber) => {
                                        return  <option value={accountNumber}>
                                                    { accountNumber }
                                                </option>     
                                    })
                                }
                            </select>

                        </div>
                    </div>
                    <div class="flex flex-col mb-2">
                        <div class="flex relative items-center">
                            <label class="mr-7">Pay to</label>
                            <input 
                                type="number"
                                id="receiverAccount"
                                name='receipientAccountNumber'
                                onChange={(e) => handleChange(e)}
                                class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Receiver's Account Number" required/>
                        </div>
                        { ( inputs.receipientAccountNumber?.length != 8 && inputs.receipientAccountNumber?.length != undefined) ? <p className='text-xs text-right text-red-500'>Enter 8 digit account number</p> : '' }
                    </div>
                    <div class="flex flex-col mt-4 mb-6">
                        <div class="flex relative">
                            <input 
                                type="number" 
                                id="amountToPay" 
                                name="amount"
                                step="0.01"
                                min="0"
                                onChange={(e) => handleChange(e)}
                                class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Amount" required/>
                            <span class="inline-flex items-center px-3 bg-white border border-gray-300 text-gray-500 shadow-sm text-sm">
                                GBP
                            </span>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <button type="submit" class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Pay
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default TransferBalance;