const fs = require('fs');
const path = require('path');

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: 'Chinese (Simplified)' },
  { code: 'zh-TW', label: 'Chinese (Traditional)' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'pt-BR', label: 'Portuguese (Brazil)' },
  { code: 'ru', label: 'Russian' },
  { code: 'it', label: 'Italian' },
  { code: 'nl', label: 'Dutch' }
];

const DOMAIN = 'https://aimuo.com';

const tools = require('./tools.json');

const blocks = tools.map(tool => {
  const header = `## 🔧 ${ tool.name['en'] || tool.key }\n`;
  const tableHeader = `| Language | URL |\n|----------|-----|\n`;
  const tableBody = LANGS.map(({ code, label }) => {
    const name = tool.name[code] || tool.name['en'];
    const url = `${ DOMAIN }/${ code }/${ tool.key }`;
    return `| ${ label } | [${ name }](${ url }) |`;
  }).join('\n');

  return `${ header }\n${ tableHeader }${ tableBody }\n`;
});

const output = blocks.join('\n');

fs.writeFileSync(path.join(__dirname, 'output.md'), output, 'utf-8');
console.log('✅ Markdown generated: output.md');
