# 推送到 GitHub 的步骤

## 步骤 1：在 GitHub 上创建仓库

1. 访问：https://github.com/new
2. 填写：
   - Repository name: `tree-sitter-arkts`
   - Description: `ArkTS grammar for tree-sitter`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（因为本地已有代码）
3. 点击 "Create repository"

## 步骤 2：初始化 Git（如果还没初始化）

```bash
# 检查是否已初始化
git status

# 如果显示 "not a git repository"，运行：
git init
```

## 步骤 3：添加文件并提交

```bash
# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: tree-sitter-arkts package"
```

## 步骤 4：添加 GitHub Remote

```bash
# 替换 YOUR_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/tree-sitter-arkts.git

# 或者使用 SSH（如果你配置了 SSH key）
# git remote add origin git@github.com:YOUR_USERNAME/tree-sitter-arkts.git
```

## 步骤 5：推送到 GitHub

```bash
# 推送主分支
git branch -M main
git push -u origin main
```

## 完整命令序列

```bash
# 1. 初始化（如果还没初始化）
git init

# 2. 添加文件
git add .

# 3. 提交
git commit -m "Initial commit: tree-sitter-arkts package"

# 4. 添加 remote（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/tree-sitter-arkts.git

# 5. 推送
git branch -M main
git push -u origin main
```

## 如果遇到认证问题

### 使用 Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成并复制令牌

推送时：
- 用户名：你的 GitHub 用户名
- 密码：粘贴刚才复制的令牌（不是你的密码！）

### 或者使用 SSH

```bash
# 生成 SSH key（如果还没有）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加到 GitHub
# 1. 复制公钥：cat ~/.ssh/id_ed25519.pub
# 2. 访问：https://github.com/settings/keys
# 3. 点击 "New SSH key"，粘贴公钥

# 使用 SSH URL
git remote set-url origin git@github.com:YOUR_USERNAME/tree-sitter-arkts.git
```

## 推送后设置 Secrets

推送成功后，就可以设置 GitHub Secrets 了：

1. 访问：`https://github.com/YOUR_USERNAME/tree-sitter-arkts/settings/secrets/actions`
2. 添加 `NPM_TOKEN`

