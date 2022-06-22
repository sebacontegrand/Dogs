const { expect } = require('chai');
const request = require('supertest')
const router = require('./dogs')

it('Should reply with post, status(200) if it is well created', async() =>{

    const res = await request(router).post('/new');
    expect(res.statusCode).toBe(200)
});