const { PrismaClient } = require("@prisma/client");

// const deleteUsers = await prisma.user.deleteMany({});
// console.log(deleteUsers);

const prisma = new PrismaClient();

async function main() {
  //   // Write your Prisma Client queries here
  //   await prisma.user.createMany({
  //     data: [
  //       {
  //         name: "User1",
  //         phone_number: 11111111,
  //       },
  //       {
  //         name: "User2",
  //         phone_number: 22222222,
  //       },
  //       {
  //         name: "User3",
  //         phone_number: 33333333,
  //       },
  //       {
  //         name: "User4",
  //         phone_number: 44444444,
  //       },
  //       {
  //         name: "User5",
  //         phone_number: 55555555,
  //       },
  //       {
  //         name: "User6",
  //         phone_number: 66666666,
  //       },
  //       {
  //         name: "User7",
  //         phone_number: 77777777,
  //       },
  //       {
  //         name: "User8",
  //         phone_number: 88888888,
  //       },
  //       {
  //         name: "User9",
  //         phone_number: 99999999,
  //       },
  //     ],
  //   });

  const allUsers = await prisma.exchange_rate.findMany();
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
