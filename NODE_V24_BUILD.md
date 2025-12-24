# Node.js v24 构建说明

## ✅ tree-sitter-arkts 在 Node.js v24 上构建成功

经过测试，`tree-sitter-arkts` 包本身可以在 Node.js v24 上成功构建。

### 构建结果

- ✅ **tree-sitter-arkts 原生模块**: 构建成功
- ❌ **tree-sitter 原生模块**: 构建失败（nan 库兼容性问题）

### 构建环境

- Node.js: v24.12.0
- GCC: 12.3.0
- G++: 12.3.0
- nan: 2.24.0 (最新版本)

### 构建命令

```bash
# 切换到 Node.js v24
nvm use 24

# 清理旧的构建
rm -rf build node_modules/tree-sitter/build

# 升级 nan 到最新版本
npm install nan@latest --save

# 构建 tree-sitter-arkts
npm run install
```

## ⚠️ 运行时限制

虽然 `tree-sitter-arkts` 可以在 Node.js v24 上构建，但**运行时需要 tree-sitter 的原生模块**。

如果 `tree-sitter` 无法在 Node.js v24 上构建，你需要：

1. **使用兼容的 Node.js 版本运行**（推荐）
   ```bash
   nvm use 20  # 或 v18, v22
   npm install
   ```

2. **或者等待 tree-sitter 更新支持 Node.js v24**

## 发布建议

- ✅ 可以在 Node.js v24 上构建包并发布
- ⚠️ 用户安装时，如果使用 Node.js v24，tree-sitter 可能无法构建
- 💡 建议在 README 中明确说明 Node.js 版本要求

