import { test, expect }     from '@playwright/test';
import { getAnyUser, insertUser }  from '../utils/db'
// npm run test:db
test('DB has at least one user', async () => {
    const user = getAnyUser();
    expect(user).toBeTruthy();
    expect(user.email).toContain('@');
});

test('Can insert a new into DB', async () =>  {
    const email = `mina_${Date.now()}@exmple.com`;
    insertUser('Mina',email);

    const user=getAnyUser();
    expect(user).toBeTruthy();
});