// 简单的测试脚本
console.log('开始测试 tree-sitter-arkts...\n');

// 检查原生模块是否存在
const fs = require('fs');
const path = require('path');

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
  const target_point = {row: 4, column: 13};
  let node = tree.rootNode.descendantForPosition(target_point, target_point);
  
  if (!node) {
    console.log('\n✗ 在目标位置未找到节点');
  } else {
    console.log('\n从目标位置向上遍历到根节点:');
    
    // 收集所有节点
    let current = node;
    while (current) {
      console.log(`${current.type}: ${current.text}\n================`);
      current = current.parent;
    }
    
  }
        
  
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

