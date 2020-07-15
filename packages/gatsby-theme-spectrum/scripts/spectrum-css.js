const fs = require('fs');
const medium = require.resolve('@spectrum-css/vars/dist/spectrum-medium.css');
const large = require.resolve('@spectrum-css/vars/dist/spectrum-large.css');

const wrap = (file, identifier, wrapper) => {
  try {
    const content = fs.readFileSync(file, 'utf8');

    if (content.startsWith(identifier)) {
      fs.writeFileSync(file, wrapper(content), 'utf8');
    }
  } catch (e) {}
};

wrap(medium, '.spectrum--medium {', (content) => `@media (any-pointer: fine) {${content}}`);
wrap(large, '.spectrum--large {', (content) => `@media (any-pointer: coarse) {${content}}`);
