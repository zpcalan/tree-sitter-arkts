# 发布检查清单

## ✅ 当前配置状态

- ✅ GitHub Actions 工作流已配置（`.github/workflows/prebuild.yml`）
- ✅ `node-gyp-build` 已配置（自动加载预编译文件）
- ✅ `prebuildify` 已配置（支持预编译）
- ✅ `index.ts` 已配置（优先使用预编译版本）
- ✅ `postinstall` 脚本已配置（自动修复 tree-sitter）

## 📦 发布流程

### 方式 1：使用 GitHub Actions 自动发布（推荐）

```bash
# 1. 更新版本号（会自动创建 git tag）
npm version patch  # 或 minor, major

# 2. 推送代码和 tag（触发 GitHub Actions）
git push --follow-tags

# 3. GitHub Actions 会自动：
#    - 为所有平台预编译（Linux, Windows, macOS）
#    - 为多个 Node.js 版本预编译（18, 20, 22, 24）
#    - 收集所有预编译文件
#    - 发布到 npm
```

### 方式 2：手动发布（如果不想用 GitHub Actions）

```bash
# 1. 生成 parser
npm run generate

# 2. 构建 TypeScript
npm run build:ts

# 3. 更新版本号
npm version patch

# 4. 发布
npm publish

# 5. 推送 tag
git push --follow-tags
```

## 🔍 发布前检查

- [ ] 代码已提交到 git
- [ ] 测试通过：`npm test`
- [ ] TypeScript 已编译：`npm run build:ts`
- [ ] 版本号已更新
- [ ] GitHub Secrets 已设置（NPM_TOKEN）
- [ ] README 已更新

## 📋 用户安装体验

### Linux 用户
- ✅ 自动下载预编译的 `.node` 文件
- ✅ 无需安装构建工具
- ✅ 无需重新编译

### Windows 用户
- ✅ 自动下载预编译的 `.node` 文件
- ✅ 无需安装 Visual Studio Build Tools
- ✅ 无需重新编译

### tree-sitter 依赖
- ✅ `postinstall` 脚本会自动修复 tree-sitter 的构建配置
- ✅ 如果使用 Node.js v24，会自动将 C++17 改为 C++20
- ✅ 自动重建 tree-sitter（如果需要）

## 🚀 快速发布命令

```bash
# 一键发布（使用 GitHub Actions）
npm version patch && git push --follow-tags
```

## ⚠️ 注意事项

1. **首次发布**：确保 GitHub Secrets 中已设置 `NPM_TOKEN`
2. **版本号**：使用 `npm version` 会自动更新 package.json 并创建 git tag
3. **预编译文件**：GitHub Actions 会自动生成，无需手动操作
4. **tree-sitter**：虽然我们无法为 tree-sitter 提供预编译，但 `postinstall` 脚本会自动处理编译问题

