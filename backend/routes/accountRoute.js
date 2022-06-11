import { createNewTransaction, getAccountData } from '../controllers/accountController.js';
import express from 'express';
const router = express.Router();

// Route for getting all account data
router.route('/myaccount/:accountNumber').get(getAccountData);

// Route for sending money
router.route('/pay').post(createNewTransaction);

export default router;