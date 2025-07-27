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

// Markdown
const renderMarkdown = (tools) => {
  return tools.map(tool => {
    const header = `## 🔧 ${ tool.name['en'] || tool.key }\n`;
    const tableHeader = `| Language | URL |\n|----------|-----|\n`;
    const tableBody = LANGS.map(({ code, label }) => {
      const name = tool.name[code] || tool.name['en'];
      const url = `${ DOMAIN }/${ code }/${ tool.key }`;
      return `| ${ label } | [${ name }](${ url }) |`;
    }).join('\n');
    return `${ header }\n${ tableHeader }${ tableBody }\n`;
  }).join('\n');
};

// HTML
const renderHtml = (tools) => {
  const sections = tools.map(tool => {
    const rows = LANGS.map(({ code, label }) => {
      const name = tool.name[code] || tool.name['en'];
      const url = `${ DOMAIN }/${ code }/${ tool.key }`;
      return `<tr><td>${ label }</td><td><a href=\"${ url }\" target=\"_blank\">${ name }</a></td></tr>`;
    }).join('\n');

    return `
      <div class=\"section\">
        <h2>🔧 ${ tool.name['en'] }</h2>
        <table>
          <thead>
            <tr><th>Language</th><th>URL</th></tr>
          </thead>
          <tbody>
            ${ rows }
          </tbody>
        </table>
      </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <meta name=\"description\" content=\"Official multilingual tool index from Aimuo Toolbox. Access online image, text, and calculation tools in 12 languages.\" />
  <title>Aimuo Toolbox – Tool Index</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0d1117; color: #c9d1d9; margin: 0; padding: 2rem; line-height: 1.6; }
    h1, h2 { color: #58a6ff; }
    a { color: #58a6ff; text-decoration: none; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
    th, td { border: 1px solid #30363d; padding: 0.5rem 1rem; }
    th { background: #161b22; }
    .section { margin-bottom: 3rem; }
  </style>
</head>
<body>
  <h1>🌐 Aimuo Toolbox - Official Tool Index</h1>
  <p>This page lists all the available online tools from <a href=\"https://aimuo.com\" target=\"_blank\">aimuo.com</a>, each available in 12 languages. You can browse and access each tool directly in your language.</p>
  ${ sections }
  <p style=\"font-size: 0.9rem; color: #8b949e\">&copy; 2025 Aimuo.com — All rights reserved.</p>
</body>
</html>`;
};

// Write files
fs.writeFileSync('output.md', renderMarkdown(tools));
fs.writeFileSync('index.html', renderHtml(tools));
console.log('✅ output.md and index.html generated successfully');
