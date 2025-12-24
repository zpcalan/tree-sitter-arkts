# 使用 Classic Token（个人账户）

## 如果 Granular Token 需要组织

npm 个人账户可以使用 **Classic Token**，不需要组织。

## 步骤

### 1. 创建 Classic Token

访问：https://www.npmjs.com/settings/zpac/tokens

1. 点击 **"Generate New Token"**
2. 如果看到选项，选择 **"Classic Token"**（不是 Granular）
3. 或者直接点击 **"Generate New Token"**，默认可能就是 Classic
4. 配置：
   - **Token name**: `publish-token`（随便起个名字）
   - **Type**: 选择 **"Automation"** 或 **"Publish"**
   - **Expiration**: 选择 **"Never expires"** 或设置较长时间
5. 点击 **"Generate Token"**
6. **立即复制令牌**（只显示一次！）

### 2. 使用令牌登录

```bash
npm logout
npm login
```

输入：
- **Username**: `zpac`
- **Password**: 粘贴刚才复制的令牌（不是你的 npm 密码！）
- **Email**: 你的 npm 邮箱

### 3. 验证并发布

```bash
npm whoami
# 应该显示：zpac

npm publish
```

## 或者：直接配置 .npmrc

如果不想每次都输入，可以直接配置：

```bash
# 编辑 ~/.npmrc 文件
nano ~/.npmrc
# 或
vim ~/.npmrc
```

添加这一行（替换 YOUR_TOKEN 为你的实际令牌）：
```
//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE
```

保存后就可以直接 `npm publish` 了。

## 区别说明

- **Classic Token**: 个人账户可用，权限较宽泛
- **Granular Access Token**: 需要组织账户，权限更精细

对于个人发布，Classic Token 完全够用。

