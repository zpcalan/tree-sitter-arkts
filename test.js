// 简单的测试脚本
console.log('开始测试 tree-sitter-arkts...\n');

// 检查原生模块是否存在
const fs = require('fs');
const path = require('path');

const bindingPath = path.join(__dirname, 'build/Release/tree_sitter_arkts_binding.node');
if (!fs.existsSync(bindingPath)) {
  console.error('✗ 错误: tree-sitter-arkts 原生模块未找到');
  console.error(`   路径: ${bindingPath}`);
  console.error('\n请先运行: npm run build');
  process.exit(1);
}
console.log('✓ tree-sitter-arkts 原生模块已找到');

// 检查 tree-sitter 依赖的原生模块
const treeSitterBindingPath = path.join(__dirname, 'node_modules/tree-sitter/build/Release/tree_sitter_runtime_binding.node');
if (!fs.existsSync(treeSitterBindingPath)) {
  console.error('\n✗ 错误: tree-sitter 原生模块未构建');
  console.error(`   路径: ${treeSitterBindingPath}`);
  console.error('\n原因: tree-sitter 在 Node.js v24 上无法编译（nan 库兼容性问题）');
  console.error('\n解决方案:');
  console.error('  1. 使用 Node.js v18 或 v20 (推荐)');
  console.error('     nvm install 20');
  console.error('     nvm use 20');
  console.error('     npm install');
  console.error('  2. 或者等待 tree-sitter 更新以支持 Node.js v24');
  console.error('\n当前 Node.js 版本:', process.version);
  process.exit(1);
}
console.log('✓ tree-sitter 原生模块已找到');

// 测试解析器
try {
  console.log('\n加载解析器模块...');
  const { createParser, parse } = require('./dist/index.js');
  console.log('✓ 模块加载成功');
  
  const testCode = `@Entry()
struct MyComponent {
  build() {
    Row() {
      Text('Hello')
    }
    .width(100)
  }
}`;

  console.log('\n测试解析 ArkTS 代码...');
  const parser = createParser();
  const tree = parser.parse(testCode);
  
  console.log('✓ 解析成功！');
  console.log('\n语法树信息:');
  console.log('  根节点类型:', tree.rootNode.type);
  console.log('  子节点数量:', tree.rootNode.childCount);
  console.log('\n语法树结构:');
  console.log(tree.rootNode.toString());
  
  console.log('\n✓ 所有测试通过！');
} catch (error) {
  console.error('\n✗ 测试失败:', error.message);
  if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('tree_sitter_runtime_binding')) {
    console.error('\n提示: tree-sitter 原生模块未构建，请使用 Node.js v18 或 v20');
  }
  if (error.stack) {
    console.error('\n错误堆栈:');
    console.error(error.stack);
  }
  process.exit(1);
}

