import { z } from "@builder.io/qwik-city";

export const IconDefs = z.enum([
  'android',
  'aws',
  'azure',
  'bash',
  'grafana',
  'hashicorp',
  'javascript',
  'kubernetees',
  'laravel',
  'mariadb',
  'mysql',
  'nix',
  'nodejs',
  'nomad',
  'php',
  'postgres',
  'python',
  'rabbitmq',
  'react',
  'rust',
  'sentry',
  'terraform',
  'typescript',
  'wasm',
]);


export const LanguagesIconDefs = z.enum([
  'usa',
  'france',
])
