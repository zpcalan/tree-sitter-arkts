# 发布指南

## 📦 发布前准备

### 1. 确保所有代码已提交
```bash
git add .
git commit -m "准备发布 v1.0.0"
git push
```

### 2. 构建 TypeScript
```bash
npm run build:ts
```

### 3. 运行测试
```bash
npm test
```

## 🚀 发布流程（两种方案）

### 方案 A：手动预编译（简单，但只支持当前平台）

如果你只想支持当前平台（Linux），可以直接发布：

```bash
# 1. 生成 parser.c 和 scanner.c
npm run generate

# 2. 构建 TypeScript
npm run build:ts

# 3. 为当前平台预编译（可选，如果不做，用户安装时会自动编译）
npm run prebuild

# 4. 发布到 npm
npm publish
```

**注意**：这种方式只包含当前平台的预编译文件。Windows 和 macOS 用户如果没有预编译文件，会自动回退到本地编译（需要安装构建工具）。

### 方案 B：使用 GitHub Actions 自动预编译所有平台（推荐）

#### 步骤 1：创建 GitHub Actions 工作流

创建 `.github/workflows/prebuild.yml`：

```yaml
name: Prebuild and Publish

on:
  push:
    tags:
      - 'v*'

jobs:
  prebuild:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate parser
        run: npm run generate
      
      - name: Prebuild
        run: npm run prebuild
      
      - name: Upload prebuilds
        uses: actions/upload-artifact@v3
        with:
          name: prebuilds-${{ matrix.os }}-node${{ matrix.node-version }}
          path: prebuilds/
  
  publish:
    needs: prebuild
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Download all prebuilds
        uses: actions/download-artifact@v3
        with:
          path: prebuilds/
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build TypeScript
        run: npm run build:ts
      
      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

#### 步骤 2：设置 NPM_TOKEN

在 GitHub 仓库设置中添加 `NPM_TOKEN` secret：
1. 去 npm 生成 access token: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. 在 GitHub 仓库 Settings → Secrets → Actions 中添加 `NPM_TOKEN`

#### 步骤 3：发布

```bash
# 1. 更新版本号
npm version patch  # 或 minor, major

# 2. 创建 git tag 并推送
git push --follow-tags

# 3. GitHub Actions 会自动：
#    - 为所有平台预编译
#    - 发布到 npm
```

## 📋 完整发布检查清单

- [ ] 代码已提交到 git
- [ ] 版本号已更新（`npm version patch/minor/major`）
- [ ] TypeScript 已编译（`npm run build:ts`）
- [ ] 测试通过（`npm test`）
- [ ] 已生成 parser.c（`npm run generate`）
- [ ] （可选）已预编译当前平台（`npm run prebuild`）
- [ ] README 和文档已更新
- [ ] 已登录 npm（`npm login`）
- [ ] 发布到 npm（`npm publish`）

## 🔍 发布后验证

```bash
# 在干净的目录测试安装
mkdir test-install
cd test-install
npm install tree-sitter-arkts
node -e "const {createParser} = require('tree-sitter-arkts'); console.log('OK');"
```

## ⚠️ 重要提示

1. **预编译文件**：如果使用方案 A，Windows 用户可能需要安装 Visual Studio Build Tools。如果使用方案 B，所有平台都有预编译文件，用户无需编译。

2. **tree-sitter 依赖**：tree-sitter 本身也需要编译。当前配置会在 `postinstall` 时自动修复并重建 tree-sitter（如果使用 Node.js v24）。

3. **包大小**：预编译文件会增加包大小，但可以避免用户需要安装构建工具。

4. **版本号**：使用 `npm version` 命令会自动更新 package.json 中的版本号并创建 git tag。

## 🎯 快速发布（当前环境，仅 Linux）

如果你想现在就发布（只支持 Linux 平台）：

```bash
# 1. 确保代码已提交
git add .
git commit -m "准备发布"

# 2. 更新版本号
npm version patch  # 这会自动创建 git tag

# 3. 生成和构建
npm run generate
npm run build:ts

# 4. （可选）预编译当前平台
npm run prebuild

# 5. 发布
npm publish

# 6. 推送 tag
git push --follow-tags
```

Windows 和 macOS 用户安装时会自动回退到本地编译（需要构建工具）。

