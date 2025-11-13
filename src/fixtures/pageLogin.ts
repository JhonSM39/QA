import { test as base } from './pages';

// Usamos el mismo fixture base y le agregamos un beforeEach
export const test = base;

// Login automático antes de cada test
test.beforeEach(async ({ loginPage }) => {
  const username = process.env.STD_USER!;
  const password = process.env.STD_PASS!;
  if (!username || !password)
    throw new Error('Las variables STD_USER o STD_PASS no están definidas');

  await loginPage.login(username, password);
});

export const expect = base.expect;
