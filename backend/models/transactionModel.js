import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    mainAccountNumber: {
        type: Number,
        length: 8,
        index: true
    },
    transactionAccountNumber: {
        type: Number,
        length: 8,
        required: true
    },
    transactionAmount: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    currentAccountBalance: {
        type: mongoose.Types.Decimal128
    },
}, {
    timestamps: false
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;