# 安装说明

## 重要提示

**这个包包含原生模块，需要在安装时编译。编译过程取决于你的 Node.js 版本和系统环境。**

## Node.js 版本要求

### ✅ 推荐版本（已验证）
- **Node.js v18 LTS** - 完全支持
- **Node.js v20 LTS** - 完全支持  
- **Node.js v22** - 支持

### ⚠️ Node.js v24 注意事项

Node.js v24 可能存在兼容性问题，因为：
- `tree-sitter` 依赖的 `nan` 库可能尚未完全支持 Node.js v24
- V8 引擎 API 变化可能导致编译失败

**解决方案：**

1. **使用推荐的 Node.js 版本**（最简单）
   ```bash
   # 使用 nvm 切换版本
   nvm install 20
   nvm use 20
   npm install tree-sitter-arkts
   ```

2. **如果必须使用 Node.js v24**
   ```bash
   # 尝试升级 tree-sitter 到最新版本
   npm install tree-sitter-arkts
   npm install tree-sitter@latest --save
   npm rebuild
   ```

## Windows 安装

### 前置要求

1. **Visual Studio Build Tools** 或 **Visual Studio**（包含 C++ 工作负载）
   - 下载: https://visualstudio.microsoft.com/downloads/
   - 选择 "Desktop development with C++" 工作负载

2. **Python 2.7 或 3.x**
   - node-gyp 需要 Python 来构建原生模块

### 安装步骤

```bash
# 1. 确保使用兼容的 Node.js 版本
node --version  # 应该是 v18, v20, 或 v22

# 2. 安装包（会自动构建原生模块）
npm install tree-sitter-arkts

# 3. 如果安装失败，尝试手动重建
npm rebuild tree-sitter-arkts
npm rebuild tree-sitter
```

## 故障排查

### 错误: "node-gyp rebuild failed"

**原因**: 缺少构建工具或 Node.js 版本不兼容

**解决**:
```bash
# Windows: 安装 Visual Studio Build Tools
# macOS: xcode-select --install
# Linux: sudo apt-get install build-essential

# 然后重新安装
npm rebuild
```

### 错误: "Cannot find module 'tree_sitter_runtime_binding'"

**原因**: tree-sitter 原生模块未构建

**解决**:
```bash
# 切换到兼容的 Node.js 版本
nvm use 20  # 或 v18, v22

# 清理并重新安装
rm -rf node_modules
npm install
```

### 错误: "NODE_MODULE_VERSION mismatch"

**原因**: 原生模块是用不同 Node.js 版本编译的

**解决**:
```bash
# 重新编译所有原生模块
npm rebuild
```

## 验证安装

```bash
# 测试包是否正常工作
node -e "const {createParser} = require('tree-sitter-arkts'); console.log('OK');"
```

如果看到 "OK"，说明安装成功！

