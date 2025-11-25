import { test, expect }     from '@playwright/test';
// npm run test:api
const API_BASE = 'https://jsonplaceholder.typicode.com';

test('GET single user from public API', async({request}) => {
    const response = await request.get(`${API_BASE}/users/1`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveProperty('email');
    expect(body.email).toContain('@');
});