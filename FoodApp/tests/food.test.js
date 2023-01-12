const request = require('supertest')
const Food = require('../src/models/food')
const app = require('../src/app')
const {
    userOneId,
    userOne,
    setupDatabase,
    userTwoId,
    taskOne,
    taskThree,
    taskTwo,
    userTwo,
    foodOne
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create food', async () => {
    const response = await request(app)
    .post('/food')
    .set('Authorization', `Bearer`)
    .send({
        name: "Cereale",
        description: "This is a description",
        kcal: "1110",
        category: "ovaz"
    })
    .expect(201)
    // const food = await Food.findById(response.body._id)
    // expect(food).not.toBeNull()
})

test('Should patch food', async () => {
    patch_name = "food_updated_1"
    patch_description = "food_description_updated_1"
    patch_kcal = 100
    const response = await request(app)
    .patch('/food/'+foodOne._id)
    .send({
        name: patch_name,
        description: patch_description,
        kcal: patch_kcal
    })
    .expect(200)
    const response2 = await request(app)
    .get('/food/'+ foodOne._id)
    .send()
    .expect(200)
    expect(response.body.name).toBe(patch_name)
    expect(response.body.description).toBe(patch_description)
    expect(response.body.kcal).toBe(patch_kcal)
})


test('Should delete food', async () => {
    const response = await request(app)
    .delete('/food/'+foodOne._id)
    .send()
    .expect(200)
})
// test('Should get tasks for user', async () => {
//     const response = await request(app)
//     .get('/task')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200)
//     expect(response.body.length).toEqual(2)
// })

// test('Should not delete other users tasks', async () => {
//     const response = await request(app)
//     .delete(`/task/${taskOne._id}`)
//     .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
//     .send()
//     .expect(404)
//     const task = await Task.findById(taskOne._id)
//     expect(task).not.toBeNull()
// })