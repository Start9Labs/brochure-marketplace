module.exports = {
  '**/*.{js,ts,html,md,json}': 'prettier --write',
  '*.ts': 'tslint --fix',
  '**/*.ts': () => 'npm run check',
}
