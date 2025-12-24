# 删除并重新发布 Tag 的步骤

## 目标
删除 v1.0.1 tag，将最新的 main 同步上去，并重新发布 v1.0.1

## 📋 操作步骤

### 步骤 1：删除本地和远程的 tag

```bash
# 1. 删除本地 tag
git tag -d v1.0.1

# 2. 删除远程 tag
git push origin --delete v1.0.1
```

### 步骤 2：确保 main 分支是最新的

```bash
# 1. 确保在 main 分支
git checkout main

# 2. 拉取最新代码
git pull origin main

# 3. 检查当前版本号
cat package.json | grep version
```

### 步骤 3：更新版本号（如果需要）

如果你想保持 v1.0.1，确保 package.json 中的版本是 1.0.1：

```bash
# 如果版本号不是 1.0.1，可以手动修改 package.json
# 或者使用 npm version（但注意这会创建新的 commit）
```

### 步骤 4：重新创建 tag 并推送

```bash
# 1. 创建新的 tag（指向当前 main 分支的最新提交）
git tag v1.0.1

# 2. 推送 tag（触发 GitHub Actions 自动构建和发布）
git push origin v1.0.1

# 或者使用 --follow-tags 同时推送代码和 tag
git push --follow-tags
```

## 🚀 一键命令（完整流程）

```bash
# 1. 删除旧的 tag
git tag -d v1.0.1
git push origin --delete v1.0.1

# 2. 确保 main 是最新的
git checkout main
git pull origin main

# 3. 重新创建并推送 tag
git tag v1.0.1
git push origin v1.0.1
```

## ⚠️ 注意事项

1. **如果 tag 已经发布到 npm**
   - npm 不允许覆盖已发布的版本
   - 如果 v1.0.1 已经在 npm 上，你需要：
     - 方案 A：发布新版本（如 v1.0.2）
     - 方案 B：使用 `npm unpublish` 删除旧版本（24小时内）
     - 方案 C：如果超过 24 小时，无法删除，只能发布新版本

2. **GitHub Actions 会自动触发**
   - 推送 tag 后，GitHub Actions 会自动：
     - 构建所有平台的预编译文件
     - 发布到 npm

3. **检查发布状态**
   ```bash
   # 检查 npm 上的版本
   npm view tree-sitter-arkts versions
   
   # 或者访问
   # https://www.npmjs.com/package/tree-sitter-arkts
   ```

## 📝 如果 v1.0.1 已经在 npm 上

### 选项 1：删除 npm 上的版本（24小时内）

```bash
# 1. 删除 npm 上的版本
npm unpublish tree-sitter-arkts@1.0.1

# 2. 然后按照上面的步骤重新发布
```

### 选项 2：发布新版本（推荐）

```bash
# 1. 更新版本号
npm version patch  # 会创建 v1.0.2

# 2. 推送 tag
git push --follow-tags
```

## 🔍 验证步骤

```bash
# 1. 检查本地 tag
git tag -l

# 2. 检查远程 tag
git ls-remote --tags origin

# 3. 检查 npm 版本
npm view tree-sitter-arkts versions

# 4. 检查 GitHub Actions
# 访问：https://github.com/YOUR_USERNAME/tree-sitter-arkts/actions
```

## 💡 推荐流程

如果 v1.0.1 已经在 npm 上且超过 24 小时：

```bash
# 1. 删除旧的 tag
git tag -d v1.0.1
git push origin --delete v1.0.1

# 2. 更新版本号（创建 v1.0.2）
npm version patch

# 3. 推送新 tag
git push --follow-tags
```

这样可以避免版本冲突问题。


