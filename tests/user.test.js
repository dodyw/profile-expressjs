const request = require('supertest');
const app = require('../app');

describe('User Routes', () => {
    let userId;

    test('Should register a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'Test User',
                username: 'testuser',
                profile_picture: 'data:image/png;base64,...',
            });
        expect(res.statusCode).toEqual(201);
        userId = res.body;
    });

    test('Should retrieve a user', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Test User');
    });

    test('Should update a user', async () => {
        const res = await request(app)
            .put(`/api/users/${userId}`)
            .send({
                name: 'Updated User',
            });
        expect(res.statusCode).toEqual(200);
    });
});

afterAll(done => {
    // close server connection
    server.close();
    done();
});
