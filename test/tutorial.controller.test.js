const request = require('supertest');
const db = require('../app/models');
const app = require('../server');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});
  
afterAll(async () => {
    await db.sequelize.close();
});


describe('Tutorial Controller', () => {
  it('should not create a new tutorial without a title', async () => {
    const res = await request(app)
      .post('/api/tutorials')
      .send({
        description: 'Test Description',
        published: true
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Content can not be empty!');
  });

  it('should create a new tutorial', async () => {
    const res = await request(app)
      .post('/api/tutorials')
      .send({
        title: 'Test Tutorial',
        description: 'Test Description',
        published: true
      });
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Tutorial');
    expect(res.body.description).toBe('Test Description');
    expect(res.body.published).toBe(true);
  });
});