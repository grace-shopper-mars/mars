'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'the Dog'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'the Dog'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Quackers',
      imageUrl:
        'https://www.munchkin.com/media/catalog/product/3/1/31001_white_hot_safety_bath_ducky.jpg',
      price: 9.99,
      description:
        'Quackers is your average rubber duck, perfectly suitable to talk through any task with you. She is your classic “jack of all trades, master on none” duck.'
    }),
    Product.create({
      name: 'Rosie',
      imageUrl:
        'https://www.amsterdamduckstore.com/wp-content/uploads/2017/03/Rosie-the-Riveter-Rubber-Duck-Amsterdam-Duck-Store.jpg',
      price: 9.99,
      description:
        'Rosie is the perfect companion for when you are the only female programmer in the office. She promises to never mansplain to you.'
    }),
    Product.create({
      name: 'Mae',
      imageUrl:
        'https://amsterdamduckstore.com/wp-content/uploads/2015/11/space-rubber-duck-e1465486677405.jpg',
      price: 9.99,
      description:
        'Mae is perfect for helping you think outside of the box. She will make your code out of this world.'
    }),
    Product.create({
      name: 'Lester',
      imageUrl:
        'https://isteam.wsimg.com/neb/obj/RjI3NDdDNkNBQ0Q5RTlDQ0Q4MkQ6MTAwMzlmMmRmMzk0MGEzNzkyNjk5MWFmNWI5NmQzNDE6Ojo6OjA=/:/rs=w:600,h:600',
      price: 9.99,
      description:
        'Quite frankly, Lester is obnoxious. He thinks he knows more than you. He doesn’t but good luck telling him that.'
    })
  ])

  console.log(
    `seeded ${users.length} users, seeded ${products.length} products`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
