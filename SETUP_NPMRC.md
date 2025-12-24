# 直接配置 .npmrc 文件（推荐方法）

如果 `npm login` 不工作，可以直接配置 `.npmrc` 文件。

## 步骤

### 1. 获取访问令牌

访问：https://www.npmjs.com/settings/zpac/tokens

1. 点击 "Generate New Token"
2. 选择 "Classic Token"（如果看到选项）
3. Type 选择 "Automation" 或 "Publish"
4. 复制生成的令牌（确保完整复制，没有多余空格）

### 2. 配置 .npmrc 文件

```bash
# 创建或编辑 ~/.npmrc 文件
nano ~/.npmrc
# 或使用 vim
vim ~/.npmrc
```

添加这一行（替换 YOUR_TOKEN 为你的实际令牌）：
```
//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE
```

**重要**：
- 令牌前后不要有空格
- 不要加引号
- 确保是完整的一行

### 3. 保存并验证

```bash
# 验证配置
cat ~/.npmrc

# 应该看到类似：
# //registry.npmjs.org/:_authToken=npm_xxxxxxxxxxxxx

# 验证登录状态
npm whoami
# 应该显示：zpac
```

### 4. 发布

```bash
npm publish
```

## 如果还是不行

### 检查令牌格式

令牌应该以 `npm_` 开头，类似：
```
npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 重新生成令牌

1. 删除旧的令牌
2. 重新生成新令牌
3. 确保复制完整（包括 `npm_` 前缀）

### 检查令牌权限

确保令牌有 "Publish" 或 "Automation" 权限。

## 完整示例

```bash
# 1. 获取令牌后，直接写入 .npmrc
echo "//registry.npmjs.org/:_authToken=npm_你的令牌" > ~/.npmrc

# 2. 验证
npm whoami

# 3. 发布
npm publish
```

