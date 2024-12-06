// Write your tests here
const request = require('supertest');
const server = require('./server');

test('sanity', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  test('[1] Recieves 404 Page not found for any unbuilt endpoints', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(404)
    expect(res.body).toStrictEqual({message: "Error 404: Page not found."})
  })
})