const faker = require('faker')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const { User, Todo } = require('./models')

async function seedAsync () {
  const userCount = await User.count({})
  if (userCount) return

  const userIds = [
    new ObjectId().toHexString(),
    new ObjectId().toHexString(),
    new ObjectId().toHexString()
  ];

  [1, 2, 3].forEach(async (userIndex) => {
    let newUser = new User({
      _id: userIds[userIndex],
      email: `user${userIndex}@example.com`,
      password: '123456',
      profile: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.city()
      }
    })
    newUser.friendIds = userIds.filter(id => id !== newUser.id)
    await newUser.save()
  })

  const todoList = Array(100).fill(0).map(() => {
    return new Todo({
      text: faker.lorem.text(),
      done: faker.random.boolean(),
      ownerId: userIds[faker.random.number(2)]
    })
  })
  await Todo.insertMany(todoList)
  console.log('Seeded data successfully')
}

module.exports.seedAsync = seedAsync
