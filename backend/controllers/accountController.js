import Transaction from '../models/transactionModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose';

//get transaction details and current balance
export const getAccountData = asyncHandler(async(req, res) => {
    
    let accountNumber = req.params.accountNumber;
    const transactions = await Transaction.find({mainAccountNumber: accountNumber}).sort({ _id: 1 });

    if(transactions.length) {
        let currentBalanceOnLatestTransaction = parseFloat(transactions[transactions.length-1].currentAccountBalance);
        let calculatedBalance = parseFloat(transactions[0].currentAccountBalance);

        transactions.forEach((transaction, index) => {
            //This is to skip first transaction
            if(index) {
                calculatedBalance += parseFloat(transaction.transactionAmount);
            }
        });

        if(currentBalanceOnLatestTransaction !== calculatedBalance) {
            res.json({
                "error": true,
                "message": "There is some transaction error"
            });
        }

        const latestTransactions = await Transaction.find({mainAccountNumber: accountNumber}).sort({ _id: -1 }).limit(5);

        return res.json({
            account: req.params.accountNumber, 
            currentBalance: currentBalanceOnLatestTransaction,
            transactions: latestTransactions
        });
    } else {
        return res.status(404).json({
            error: true,
            message: "Account doesn't exist"
        });
    }
});

//create a new transaction in db
export const createNewTransaction = asyncHandler(async(req, res) => {

    let mainAccountNumber = req.body.accountNumber;
    let transactionAccountNumber = req.body.receipientAccountNumber;
    let transactionAmount = req.body.amount;

    let account = await Transaction.findOne({mainAccountNumber: transactionAccountNumber}).sort({ _id: -1 });

    if(account !== null) {

        let senderAccount = await Transaction.findOne({mainAccountNumber: mainAccountNumber}).sort({ _id: -1 });

        let updatedBalanceForSender = parseFloat(senderAccount.currentAccountBalance) - parseFloat(transactionAmount);
        let updatedBalanceForReceiver = parseFloat(account.currentAccountBalance) + parseFloat(transactionAmount);

        if(updatedBalanceForSender < 0) {
            return res.json({
                error: true,
                message: "You don't have enough funds"
            });
        }

        const transactionForSender = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            mainAccountNumber: mainAccountNumber,
            transactionAccountNumber: transactionAccountNumber,
            transactionAmount: transactionAmount * -1,
            currentAccountBalance: updatedBalanceForSender
        });

        const transactionForReceiver = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            mainAccountNumber: transactionAccountNumber,
            transactionAccountNumber: mainAccountNumber,
            transactionAmount: transactionAmount,
            currentAccountBalance: updatedBalanceForReceiver
        });

        transactionForSender.save(function (err) {
            if (err) console.log(err);
        });

        transactionForReceiver.save(function (err) {
            if (err) console.log(err);
        });

        return res.json({
            error: false,
            message: "Your transaction was succesfull"
        })

    } else {
        return res.json({
            error: true,
            message: "Receipent's account doesn't exist"
        });
    }
});