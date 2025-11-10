import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  // 📂 Carpeta donde se guardan los resultados de cada test (traces, videos, screenshots)
  outputDir: 'test-results',

  // 🔁 Ejecuta en paralelo todos los tests de un archivo
  fullyParallel: true,

  // ❌ Evita que se suban tests con .only al CI
  forbidOnly: !!process.env.CI,

  // 🔁 Reintentos (una vez por defecto)
  retries: 1,

  // 🧠 Usa 1 worker en CI para evitar conflictos
  workers: process.env.CI ? 1 : undefined,

  // 📊 Reportes
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['line']
  ],

  // ⚙️ Configuración compartida para todos los tests
  use: {
    screenshot: 'only-on-failure',     // ✅ solo guarda capturas si falla el test
    trace: 'retain-on-failure',        // guarda trace solo si falla
    video: 'retain-on-failure',        // guarda video solo si falla
    baseURL:  process.env.BASE_URL,
  },

  // 🌐 Proyectos (navegadores)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        launchOptions: { slowMo: 150 }, // Safari a veces necesita un delay
      },
      retries: 2,
      timeout: 45_000,
    },
  ],
});