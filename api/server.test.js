// Write your tests here
const request = require('supertest');
const server = require('./server');
const db = require('.././data/dbConfig.js');

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})
afterAll(async () => {
  await db.destroy();
})

test('sanity', () => {
  expect(true).not.toBe(false);
})

describe('server.js', () => {
  test('[1] Recieves 404 Page not found for any unbuilt endpoints', async () => {
    let res = await request(server).get('/asdf');
    expect(res.status).toBe(404);
    expect(res.body).toStrictEqual({message: "Error 404: Page not found."});
    res = await request(server).get('/www');
    expect(res.status).toBe(404);
    expect(res.body).toStrictEqual({message: "Error 404: Page not found."});
    res = await request(server).get('/bob');
    expect(res.status).toBe(404);
    expect(res.body).toStrictEqual({message: "Error 404: Page not found."});
  });
  test('[2] Register new user successfully', async () => {
    const res = await request(server).post('/api/auth/register').send({username: "test", password: "12345"});
    expect(res.status).toBe(201);
    expect(res.body.id).toBeTruthy();
    expect(res.body.username).toBeTruthy();
    expect(res.body.password).toBeTruthy();

  });
  test('[3] Registering a new user without a username or password results in an error', async () => {
    let res = await request(server).post('/api/auth/register').send({username: "", password: "12345"});
    expect(res.body.message).toBe("username and password required");
    res = await request(server).post('/api/auth/register').send({username: "test", password: ""});
    expect(res.body.message).toBe("username and password required");
  });
  test('[4] Registering a new user needs a unique username', async () => {
    let res = await request(server).post('/api/auth/register').send({username: "test", password: "12345"});
    expect(res.status).toBe(201);
    res = await request(server).post('/api/auth/register').send({username: "test", password: "12345"});
    expect(res.body.message).toBe("username taken");
  });
  test('[5] Login with valid credentials', async () => {
    await request(server).post('/api/auth/register').send({username: "test", password: "12345"});
    const res = await request(server).post('/api/auth/login').send({username: "test", password: "12345"});
    console.log(res)
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("welcome, test");
    expect(res.body.token).toBeTruthy();
  });
  test('[6] Login requires username and password', async () => {
    let res = await request(server).post('/api/auth/login').send({username: "", password: "12345"});
    expect(res.body.message).toBe("username and password required");
    res = await request(server).post('/api/auth/login').send({username: "test", password: ""});
    expect(res.body.message).toBe("username and password required");
  });
  test('[7] Can\'t login with invalid credentials', async () => {
    await request(server).post('/api/auth/login').send({username: "test", password: "12345"});
    const res = await request(server).post('/api/auth/login').send({username: "test1", password: "123456"});
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("invalid credentials");
    expect(res.body.token).toBeFalsy();
  });
});