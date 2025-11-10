import { Errors } from '../src/config/errors';
import { test, expect } from '../src/fixtures/pages';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Login Scenarios', () => {

    test('Login exitoso', async ({ loginPage }) => {
        const username = process.env.STD_USER;
        const password = process.env.STD_PASS;
        if (!username || !password) throw new Error('La variable de entorno STD_USER o STD_PASS no está definida');
        
        await loginPage.login(username, password);
    });

    test('Login sin usuario ni contraseña', async ({ loginPage, page }) => {
        const error = await loginPage.loginWithoutCredentials();

        if (test.info().project.name === 'webkit') {
            await loginPage.assertNotLoggedIn();
            return;
        }

        expect(error).toBe(Errors.usernameRequired);
    })

    test('Login sin usuario y con contraseña', async ({ loginPage }) => {
        const error = await loginPage.loginWithoutUsername('standard_user');
        if (test.info().project.name === 'webkit') {
            await loginPage.assertNotLoggedIn();
            return;
        }
        expect(error).toBe(Errors.usernameRequired);
    })

    test('Login con usuario y sin contraseña', async ({ loginPage}) => {
        const error = await loginPage.loginWithoutPassword('secret_sauce');
        if (test.info().project.name === 'webkit') {
            await loginPage.assertNotLoggedIn();
            return;
        }
        expect(error).toBe(Errors.passwordRequired);
    })
});