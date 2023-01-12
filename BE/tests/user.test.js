const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async() => {
    const response = await request(app).post('/users').send({
        name: "Calin",
        mail: "haz.george.diea@gmail.com",
        password: "123456"
    }).expect(201)

    // assert that the database was changes correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    //asert about the response
    expect(response.body).toMatchObject({
        user:{
            name: "Calin",
            mail: "haz.george.diea@gmail.com"
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('123456')
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        mail: userOne.mail,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        mail: userOne.mail,
        password: "password"
    }).expect(400)
})


test('Should not get profile for user when token is not available', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer 1`)
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should update valid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        "name": "ab",
        "email" : "1",
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual("ab")
})

test('Should not update valid user for invalid fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        "location": "USA",
    }).expect(400)
})