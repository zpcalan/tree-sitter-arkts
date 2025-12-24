# Node.js 版本兼容性说明

## 推荐版本

- **Node.js v18 LTS** ✅ (推荐)
- **Node.js v20 LTS** ✅ (推荐)
- **Node.js v22** ✅ (支持)

## Node.js v24 兼容性问题

Node.js v24 目前存在兼容性问题，原因：

1. **nan 库兼容性**: tree-sitter 依赖的 `nan` 库在 Node.js v24 上可能存在编译问题
2. **V8 API 变化**: Node.js v24 使用了新版本的 V8 引擎，某些 API 发生了变化

## 解决方案

### 方案 1: 使用推荐的 Node.js 版本（推荐）

使用 nvm 切换到兼容的版本：

```bash
# 安装 Node.js v20
nvm install 20
nvm use 20

# 重新安装依赖
npm install
```

### 方案 2: 尝试升级 tree-sitter（实验性）

如果必须使用 Node.js v24，可以尝试：

```bash
# 升级到最新版本的 tree-sitter
npm install tree-sitter@latest

# 清理并重新构建
rm -rf node_modules build
npm install
npm rebuild
```

### 方案 3: 使用 Docker 或容器化

在容器中使用兼容的 Node.js 版本进行构建和运行。

## 检查当前环境

```bash
# 检查 Node.js 版本
node --version

# 检查 tree-sitter 版本
npm list tree-sitter

# 尝试重新构建
npm rebuild tree-sitter
```

## 构建错误排查

如果遇到构建错误，请检查：

1. **构建工具**: Windows 需要 Visual Studio Build Tools
2. **Python**: 需要 Python 2.7 或 3.x
3. **node-gyp**: 确保已正确安装

```bash
# 检查 node-gyp
npm list -g node-gyp

# 如果未安装，全局安装
npm install -g node-gyp
```

## 未来支持

我们正在关注 tree-sitter 和 nan 库的更新，一旦它们支持 Node.js v24，我们会及时更新包配置。

