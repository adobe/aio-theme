const fs = require('fs');
const medium = require.resolve('@spectrum-css/vars/dist/spectrum-medium.css');
const large = require.resolve('@spectrum-css/vars/dist/spectrum-large.css');
const icon = require.resolve('@spectrum-css/icon/dist/index-vars.css');

const wrap = (file, identifier, wrapper) => {
  try {
    const content = fs.readFileSync(file, 'utf8');

    if (content.startsWith(identifier)) {
      fs.writeFileSync(file, wrapper(content), 'utf8');
    } else {
      let applyWrapper = false;
      fs.writeFileSync(
        file,
        content
          .split('\n')
          .map((line) => {
            if (line.startsWith(identifier)) {
              applyWrapper = true;
              return wrapper(line);
            } else if (applyWrapper && line.includes('}')) {
              applyWrapper = false;
              return `${line}}`;
            }

            return line;
          })
          .join('\n'),
        'utf-8'
      );
    }
  } catch (e) {}
};

wrap(medium, '.spectrum--medium {', (content) => `@media (any-pointer: fine) {${content}}`);
wrap(large, '.spectrum--large {', (content) => `@media (any-pointer: coarse) {${content}}`);
wrap(icon, '.spectrum--medium', (content) => `@media (any-pointer: fine) {${content}`);
wrap(icon, '.spectrum--large', (content) => `@media (any-pointer: coarse) {${content}`);
