import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  // 📂 Carpeta donde se guardan los resultados (traces, videos, screenshots)
  outputDir: 'test-results',

  // ⚡ Ejecuta en paralelo todos los tests dentro de un mismo archivo
  fullyParallel: true,

  // 🚫 Evita subir commits con test.only al CI
  forbidOnly: !!process.env.CI,

  // 🔁 Reintentos inteligentes: solo en CI hace 2 reintentos
  retries: process.env.CI ? 2 : 0,

  // 👷 Controla cuántos workers paralelos usa Playwright
  // En CI reducimos a 2 para estabilidad
  workers: process.env.CI ? 2 : undefined,

  // 🧾 Reportes: HTML local + línea en consola + Allure
  reporter: [
    ['line'],
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['allure-playwright']
  ],

  // ⚙️ Configuración compartida para todos los tests
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',        // 🎯 genera trace en el primer fallo
    video: 'retain-on-failure',     // guarda video solo si falla
  },

  // 🌐 Proyectos (navegadores)
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: {
        ...devices['Desktop Safari'],
        launchOptions: { slowMo: 100 }, // Safari a veces necesita un delay leve
      },
      timeout: 45_000, // 45s máximo por test
    },
  ],
});