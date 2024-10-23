import { Router } from 'express';
import { createCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer } from '../controllers/customerController';

const router = Router();

router.post('/', createCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
