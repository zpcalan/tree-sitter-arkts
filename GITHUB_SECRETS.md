# 设置 GitHub Secrets 的详细步骤

## 方法 1：通过仓库设置

1. **打开你的 GitHub 仓库页面**
   - 访问：`https://github.com/YOUR_USERNAME/YOUR_REPO`

2. **进入 Settings**
   - 点击仓库页面顶部的 **"Settings"** 标签

3. **找到 Secrets**
   根据 GitHub 界面版本，可能显示为：
   - **"Secrets and variables"** → **"Actions"**
   - 或者直接是 **"Secrets"** 在左侧菜单
   - 或者 **"Security"** → **"Secrets and variables"** → **"Actions"**

4. **添加 Secret**
   - 点击 **"New repository secret"** 或 **"Add secret"**
   - Name: `NPM_TOKEN`
   - Value: 粘贴你的 npm 访问令牌
   - 点击 **"Add secret"**

## 方法 2：直接访问 URL

如果找不到，可以直接访问（替换 YOUR_USERNAME 和 YOUR_REPO）：

```
https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions
```

## 方法 3：通过 Actions 页面

1. 点击仓库顶部的 **"Actions"** 标签
2. 如果工作流运行失败，会提示设置 Secrets
3. 点击提示中的链接进入设置页面

## 如果还是找不到

### 检查权限
- 确保你是仓库的 **Owner** 或 **Admin**
- 如果是 Fork 的仓库，需要在你的 Fork 中设置

### 检查仓库类型
- 如果是 **Public** 仓库，应该可以看到 Settings
- 如果是 **Private** 仓库，也需要有权限

## 替代方案：不使用 GitHub Actions

如果无法设置 Secrets，可以：

1. **手动预编译 Windows 版本**
   - 在 Windows 机器上运行 `npm run prebuild:win32`
   - 将 `prebuilds/` 目录提交到 git

2. **使用本地发布**
   - 手动为所有平台预编译
   - 然后发布

## 快速检查

运行这个命令查看你的仓库 URL：
```bash
git remote -v
```

然后访问：`https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`

