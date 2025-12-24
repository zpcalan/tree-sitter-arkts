# 使用访问令牌发布（无需 2FA）

## 步骤

### 1. 创建访问令牌

访问：https://www.npmjs.com/settings/zpac/tokens

1. 点击 **"Generate New Token"**
2. 选择 **"Granular Access Token"**
3. 配置：
   - **Token name**: `publish-tree-sitter-arkts`（随便起个名字）
   - **Expiration**: 选择 "No expiration" 或设置较长时间
   - **Select scopes**: 
     - 勾选 **"Automation"** 或 **"Publish"**
     - 如果有 **"Bypass 2FA"** 选项，务必勾选
4. 点击 **"Generate Token"**
5. **立即复制令牌**（只显示一次！）

### 2. 使用令牌登录

```bash
# 先退出当前登录
npm logout

# 重新登录（使用令牌作为密码）
npm login
```

登录时输入：
- **Username**: `zpac`
- **Password**: 粘贴刚才复制的令牌（不是你的 npm 密码！）
- **Email**: 你的 npm 邮箱

### 3. 验证登录

```bash
npm whoami
# 应该显示：zpac
```

### 4. 发布

```bash
npm publish
```

## 或者：直接配置 .npmrc（推荐）

如果不想每次都输入，可以直接配置：

```bash
# 创建或编辑 ~/.npmrc
echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE" >> ~/.npmrc

# 替换 YOUR_TOKEN_HERE 为你的实际令牌
```

然后就可以直接 `npm publish` 了，无需登录。

## 注意事项

- 令牌相当于密码，不要分享或提交到代码仓库
- 如果令牌泄露，立即在 npm 网站上删除并重新生成
- 建议设置较长的过期时间，避免频繁更新

