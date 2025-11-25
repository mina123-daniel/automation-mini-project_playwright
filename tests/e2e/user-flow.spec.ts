import { test, expect }               from '@playwright/test';
import { insertUser, getAnyUser }     from '../utils/db';
import { LoginPage }                  from '../pages/LoginPage';

// npm run test:e2e
const API_BASE = 'https://jsonplaceholder.typicode.com';

test('End to End demo: API -> DB -> UI', async({page, request}) => {
    // 1) API: get user data
    const response = await request.get(`${API_BASE}/users/1`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    const name = body.name as string;
    const email = body.email as string;

    // 2) DB: insert user into SQLite
    insertUser(name, email);
    const user=getAnyUser();
    expect(user).toBeTruthy();

    // 3) UI: perform login on demo site (static credentials)
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user','secret_sauce');
    await expect(page.locator('.inventory_list')).toBeVisible();
});
