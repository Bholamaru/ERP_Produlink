const fs = require('fs');
const path = require('path');

const filePath = 'C:/Users/Dell/Downloads/ERP_Produlink-main/src/Sales/Reports/OutwardChallanList/OutwardChallanList.jsx';
const code = fs.readFileSync(filePath, 'utf8');

const projectNodeModules = 'C:/Users/Dell/Downloads/ERP_Produlink-main/node_modules';
try {
  const parser = require(path.join(projectNodeModules, '@babel/parser'));
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log('Successfully parsed OutwardChallanList.jsx without errors!');
} catch (err) {
  console.error('Babel parsing failed with error:');
  console.error(err.message);
  if (err.loc) {
    console.error(`Error location: Line ${err.loc.line}, Column ${err.loc.column}`);
    const lines = code.split('\n');
    console.error(`Context:`);
    console.error(lines[err.loc.line - 2]);
    console.error(lines[err.loc.line - 1]);
    console.error(' '.repeat(err.loc.column) + '^');
    console.error(lines[err.loc.line]);
  }
}
