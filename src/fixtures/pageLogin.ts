import { test as base } from './pages';

export const test = base.extend({});

test.beforeEach(async ({ loginPage }) => {
  const username = process.env.STD_USER!;
  const password = process.env.STD_PASS!;

  await loginPage.navigate();
  await loginPage.login(username, password);
});

export const expect = base.expect;