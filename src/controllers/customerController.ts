import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { zip_code, country, first_name, last_name, email, phone_number, address, city, state } = req.body;
    const customer = await prisma.customers.create({
      data: {
        zip_code,
        country,
        first_name,
        last_name,
        email,
        phone_number,
        address,
        city,
        state,
      },
    });
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating customer' });
  }
};

// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customers.findMany();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching customers' });
  }
};

// Get customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customers.findUnique({
      where: { customer_id: Number(id) },
    });
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching customer' });
  }
};

// Update a customer
export const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { zip_code, country, first_name, last_name, email, phone_number, address, city, state } = req.body;
  try {
    const customer = await prisma.customers.update({
      where: { customer_id: Number(id) },
      data: {
        zip_code,
        country,
        first_name,
        last_name,
        email,
        phone_number,
        address,
        city,
        state,
      },
    });
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating customer' });
  }
};

// Delete a customer
export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.customers.delete({
      where: { customer_id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting customer' });
  }
};
