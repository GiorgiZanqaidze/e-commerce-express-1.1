import { Router } from 'express';
import { createCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer } from '../controllers/customerController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', createCustomer);
router.get('/', getAllCustomers);
router.get('/:id', authMiddleware, getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
