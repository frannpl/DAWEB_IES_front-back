const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/environments/environment.prod.ts');
const apiUrl = process.env.API_URL || '';

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

fs.writeFileSync(targetPath, envConfigFile, 'utf8');
console.log(`Production environment.ts generated with apiUrl: ${apiUrl}`);
