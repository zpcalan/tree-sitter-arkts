// 验证包结构的测试脚本（不需要 tree-sitter 原生模块）
const fs = require('fs');
const path = require('path');

console.log('验证 tree-sitter-arkts 包结构...\n');

const checks = [
  {
    name: 'TypeScript 编译输出',
    files: [
      'dist/index.js',
      'dist/index.d.ts'
    ]
  },
  {
    name: '原生模块',
    files: [
      'build/Release/tree_sitter_arkts_binding.node'
    ]
  },
  {
    name: '源代码文件',
    files: [
      'src/parser.c',
      'bindings/node/binding.cc',
      'grammar.js',
      'binding.gyp'
    ]
  },
  {
    name: '配置文件',
    files: [
      'package.json',
      'tsconfig.json'
    ]
  }
];

let allPassed = true;

for (const check of checks) {
  console.log(`检查 ${check.name}:`);
  for (const file of check.files) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`  ✓ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    } else {
      console.log(`  ✗ ${file} (未找到)`);
      allPassed = false;
    }
  }
  console.log('');
}

// 检查 package.json 配置
try {
  const packageJson = require('./package.json');
  console.log('检查 package.json 配置:');
  console.log(`  ✓ name: ${packageJson.name}`);
  console.log(`  ✓ version: ${packageJson.version}`);
  console.log(`  ✓ main: ${packageJson.main}`);
  console.log(`  ✓ types: ${packageJson.types}`);
  console.log('');
} catch (error) {
  console.error('  ✗ 无法读取 package.json:', error.message);
  allPassed = false;
}

// 检查 TypeScript 编译输出
try {
  const indexJs = fs.readFileSync(path.join(__dirname, 'dist/index.js'), 'utf8');
  if (indexJs.includes('createParser') && indexJs.includes('parse')) {
    console.log('✓ TypeScript 编译输出包含必要的导出');
  } else {
    console.error('✗ TypeScript 编译输出缺少必要的导出');
    allPassed = false;
  }
} catch (error) {
  console.error('✗ 无法读取 dist/index.js:', error.message);
  allPassed = false;
}

if (allPassed) {
  console.log('✓ 包结构验证通过！');
  console.log('\n注意: 要运行完整的功能测试，需要 tree-sitter 原生模块。');
  console.log('      请使用 Node.js v18 或 v20 运行 npm install 和 npm test');
} else {
  console.error('\n✗ 包结构验证失败，请检查上述错误');
  process.exit(1);
}

