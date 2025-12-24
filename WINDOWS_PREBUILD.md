# Windows 预编译解决方案

## 问题

Windows 用户安装时需要重新编译，需要安装 Visual Studio Build Tools，体验不好。

## 解决方案

### 方案 1：使用 GitHub Actions 自动预编译（推荐）

我已经创建了 `.github/workflows/prebuild.yml`，它会自动为所有平台（包括 Windows）预编译。

#### 使用方法：

1. **设置 NPM_TOKEN**
   - 在 GitHub 仓库 Settings → Secrets → Actions
   - 添加 `NPM_TOKEN` secret（你的 npm 访问令牌）

2. **发布时自动预编译**
   ```bash
   # 更新版本号
   npm version patch  # 或 minor, major
   
   # 推送 tag（触发 GitHub Actions）
   git push --follow-tags
   ```

3. **GitHub Actions 会自动**：
   - 为 Windows、Linux、macOS 预编译
   - 为多个 Node.js 版本预编译（18, 20, 22, 24）
   - 收集所有预编译文件
   - 发布到 npm

#### 优点：
- ✅ 完全自动化
- ✅ 支持所有平台
- ✅ 支持多个 Node.js 版本
- ✅ Windows 用户无需编译

### 方案 2：手动预编译 Windows 版本

如果你有 Windows 机器或虚拟机：

```bash
# 在 Windows 上运行
npm install
npm run prebuild:win32
```

然后将 `prebuilds/` 目录添加到 git 并提交。

#### 缺点：
- ❌ 需要 Windows 环境
- ❌ 需要手动操作
- ❌ 只支持当前 Node.js 版本

### 方案 3：使用 GitHub Actions 手动触发

1. 访问 GitHub 仓库的 Actions 页面
2. 选择 "Prebuild for all platforms" workflow
3. 点击 "Run workflow"
4. 等待完成后，下载 artifacts
5. 解压到项目的 `prebuilds/` 目录
6. 提交并发布

## 当前配置

✅ 已配置 `node-gyp-build` - 自动加载预编译文件  
✅ 已配置 `prebuildify` - 支持预编译  
✅ 已配置 `index.ts` - 优先使用预编译版本  
✅ 已创建 GitHub Actions workflow

## 验证预编译

发布后，Windows 用户可以验证：

```bash
# Windows 用户安装
npm install tree-sitter-arkts

# 检查是否有预编译文件
ls node_modules/tree-sitter-arkts/prebuilds/win32-x64/

# 应该看到 .node 文件，而不是需要编译
```

## 推荐流程

**使用 GitHub Actions（方案 1）**：

1. 设置 `NPM_TOKEN` secret
2. 开发完成后：
   ```bash
   npm version patch
   git push --follow-tags
   ```
3. GitHub Actions 自动完成所有平台的预编译和发布

这样 Windows 用户安装时就有预编译文件，无需重新编译！

