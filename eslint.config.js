import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPlaywright from 'eslint-plugin-playwright';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['ci-report/**', 'test-results/**', 'reports/**'],
  },

  // -------------------------
  // ✅ Reglas para TODO el repo
  // -------------------------
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      playwright: eslintPluginPlaywright,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...eslintPluginPlaywright.configs['flat/recommended'].rules,

      // Estándares recomendados
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',

      // CamelCase para todo el repo
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
      ],
    },
  },

  // ------------------------------------------------------
  // ✅ Overrides: Reglas ESPECÍFICAS para pruebas Playwright
  // ------------------------------------------------------
  {
    files: ['tests/**/*.ts', '**/*.spec.ts'],
    rules: {
      // Permitimos expect condicionales en WebKit, etc.
      'playwright/no-conditional-in-test': 'off',

      // A veces obligan timeouts controlados
      'playwright/no-wait-for-timeout': 'off',

      // No exigir expect obligatorio en tests "smoke"
      'playwright/expect-expect': 'warn',

      // Permitir nombres en minúscula para fixtures
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // -------------------------
  // ✅ Prettier al final SIEMPRE
  // -------------------------
  prettierConfig,
];