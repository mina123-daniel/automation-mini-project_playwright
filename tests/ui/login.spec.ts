import { test, expect }  from '@playwright/test' ;
import { LoginPage }     from '../pages/LoginPage';

// npm run test:ui

test('Valid user can login and see inventory', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page.locator('.inventory_list')).toBeVisible();
});

test('Locked out user sees error message', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user','secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
});

