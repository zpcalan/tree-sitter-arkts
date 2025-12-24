#!/usr/bin/env node
// 修复所有 tree-sitter 的 binding.gyp 以支持 Node.js v24 (需要 C++20)
const fs = require('fs');
const path = require('path');

function findTreeSitterGypFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // 检查是否是 tree-sitter 目录
          const gypPath = path.join(filePath, 'binding.gyp');
          if (fs.existsSync(gypPath)) {
            fileList.push(gypPath);
          }
          // 递归搜索（包括 node_modules）
          findTreeSitterGypFiles(filePath, fileList);
        }
      } catch (err) {
        // 忽略权限错误等
      }
    });
  } catch (err) {
    // 忽略读取错误
  }
  
  return fileList;
}

const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('node_modules not found, skipping fix');
  process.exit(0);
}

const gypFiles = findTreeSitterGypFiles(nodeModulesPath);
let fixedCount = 0;

gypFiles.forEach(gypPath => {
  try {
    let content = fs.readFileSync(gypPath, 'utf8');
    const original = content;
    
    // 替换 C++17 为 C++20
    content = content.replace(/c\+\+17/g, 'c++20');
    content = content.replace(/std:c\+\+17/g, 'std:c++20');
    
    if (content !== original) {
      fs.writeFileSync(gypPath, content);
      fixedCount++;
      console.log(`✓ Fixed ${gypPath.replace(__dirname + '/', '')}`);
    }
  } catch (error) {
    console.error(`Error fixing ${gypPath}:`, error.message);
  }
});

if (fixedCount > 0) {
  console.log(`\n✓ Fixed ${fixedCount} tree-sitter binding.gyp file(s) for Node.js v24 (C++20)`);
} else if (gypFiles.length > 0) {
  console.log('All tree-sitter binding.gyp files already use C++20');
} else {
  console.log('No tree-sitter binding.gyp files found');
}

