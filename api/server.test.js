 const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')



beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})




test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /api/auth/register', () => {
  let user = {username: 'Jamal', password: '123'}
  test('adds user to the database', async () => {
      await request(server).post('/api/auth/register').send(user)
      expect(await db('users')).toHaveLength(1)
  })
  test('responds back with the right status',  async () => {
    const use = {username: 'Jam', password: '123'}
    const res = await request(server).post('/api/auth/register').send(use)
    expect(res.status).toBe(201)
  })
})

describe('[POST] /api/auth/login', () => {
const existingUser =  {username: 'Jamal', password: '123'}
  test('allows existing user to login and responds back with user info', async () => {
    const res =await request(server).post('/api/auth/login').send(existingUser)
    expect(res.body).toHaveProperty('token')
  })
  test('responds back with the status', async () => {
    const res =await request(server).post('/api/auth/login').send(existingUser)
    expect(res.status).toBe(200)
  })
})

describe('[GET] /api/jokes', () => {
  test('restricted endpoint without token', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
  })
  test('e', async() => {
      const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IkphbWFsIiwiaWF0IjoxNzA1NzYwMTMwLCJleHAiOjE3MDU4NDY1MzB9.55UyrYRRARRJYz8q7r_13X8xJU6jK5TZPYtjFKv-uJ8"

      const res = await request(server).get('/api/jokes').set('Authorization', validToken)
      expect(res.status).toBe(200)

  })
})







// Write your tests here

