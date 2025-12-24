# npm 发布权限问题解决方案

## 错误信息
```
403 Forbidden - Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

## 解决方案（两种方式）

### 方案 1：启用双因素认证（推荐）

1. **登录 npm 网站**
   - 访问：https://www.npmjs.com/
   - 登录你的账户

2. **启用 2FA**
   - 进入账户设置：https://www.npmjs.com/settings/YOUR_USERNAME/tfa
   - 点击 "Enable 2FA"
   - 使用认证应用（如 Google Authenticator）扫描二维码
   - 输入验证码完成设置

3. **重新登录 npm**
   ```bash
   npm logout
   npm login
   # 输入用户名、密码和 2FA 验证码
   ```

4. **重新发布**
   ```bash
   npm publish
   ```

### 方案 2：使用访问令牌（Access Token）

1. **创建访问令牌**
   - 访问：https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - 点击 "Generate New Token"
   - 选择 "Granular Access Token"
   - 设置权限：
     - **Read and Publish**（读取和发布）
     - 勾选 "Bypass 2FA"（如果需要）
   - 复制生成的令牌（只显示一次！）

2. **使用令牌登录**
   ```bash
   npm logout
   npm login
   # 用户名：你的 npm 用户名
   # 密码：粘贴刚才复制的令牌（不是密码！）
   # 邮箱：你的 npm 邮箱
   ```

   或者直接在 `.npmrc` 文件中配置：
   ```bash
   echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE" > ~/.npmrc
   ```

3. **验证登录**
   ```bash
   npm whoami
   ```

4. **重新发布**
   ```bash
   npm publish
   ```

## 快速检查

```bash
# 检查当前登录状态
npm whoami

# 如果显示你的用户名，说明已登录
# 如果显示错误，需要重新登录
```

## 注意事项

1. **令牌安全**：访问令牌相当于密码，不要分享或提交到代码仓库
2. **2FA 推荐**：虽然使用令牌可以绕过 2FA，但启用 2FA 更安全
3. **令牌权限**：确保令牌有 "Publish" 权限

## 如果还是不行

1. **检查包名是否已被占用**
   ```bash
   npm view tree-sitter-arkts
   ```
   如果包已存在，需要：
   - 使用不同的包名
   - 或者成为该包的维护者

2. **检查账户权限**
   - 确保你的账户有发布权限
   - 如果是组织账户，确保你有发布权限

3. **联系 npm 支持**
   - 如果以上方法都不行，联系 npm 支持：support@npmjs.com

