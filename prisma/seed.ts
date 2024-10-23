import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Delete existing customers
  await prisma.customers.deleteMany();

  // Create new customers
  const customers: any = [];

  for (let i = 0; i < 10; i++) {
    const customer = await prisma.customers.create({
      data: {
        zip_code: faker.location.zipCode(), // Generates a random zip code
        country: faker.location.country(),    // Generates a random country name
        first_name: faker.name.firstName(),  // Generates a random first name
        last_name: faker.name.lastName(),    // Generates a random last name
        email: faker.internet.email(),       // Generates a random email address
        phone_number: faker.phone.number(),  // Generates a random phone number
        address: faker.location.streetAddress(), // Generates a random street address
        city: faker.location.city(),          // Generates a random city name
        state: faker.location.state(),        // Generates a random state name
      },
    });
    customers.push(customer);
  }

  console.log(customers);

    // Delete existing users
    await prisma.user.deleteMany();

    // Create new users
    const users: any = [];
  
    for (let i = 0; i < 10; i++) {
      const user = await prisma.user.create({
        data: {
          username: faker.internet.userName(), // Generates a random username
          email: faker.internet.email(),        // Generates a random email address
          password: faker.internet.password(),   // Generates a random password
        },
      });
      users.push(user);
    }
  
    console.log(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
