const request = require('supertest');
const app = require('../../backend/server');



describe('User Registration', () => {
    it('should register a new user', async () => {
        const newUser = {
            username: 'testUser',
            password: 'password123',
            email: 'test@example.com'
        };

        const response = await request(app)
            .post('/api/register')
            .send(newUser);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id'); 
        expect(response.body).toHaveProperty('username', newUser.username);
        
    });
});
