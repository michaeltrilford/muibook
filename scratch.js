const fs = require('fs');

const cssFiles = [
  'public/css/mui-tokens.css',
  'src/muibook/css/themes/ana/index.css',
  'src/muibook/css/themes/jal/index.css',
  'src/muibook/css/themes/paperclip/index.css',
  'src/muibook/css/themes/sensei/index.css',
];

cssFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/.*--surface-elevated-alpha:.*\n/g, '');
    content = content.replace(/.*--surface-recessed-alpha:.*\n/g, '');
    fs.writeFileSync(file, content);
  }
});

const storyFiles = [
  'src/muibook/story/components/mui-video-thumbnail/index.js',
  'src/muibook/story/compositions/muitube/index.js'
];

storyFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/var\(--surface-recessed-alpha\)/g, 'var(--shadow-color-medium)');
    fs.writeFileSync(file, content);
  }
});

