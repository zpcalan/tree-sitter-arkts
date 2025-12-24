# 发布指南

## 发布到 npm

### 1. 准备工作

```bash
# 确保已登录 npm
npm login

# 检查包信息
npm whoami
```

### 2. 构建和测试

```bash
# 清理旧的构建
rm -rf build dist

# 完整构建
npm run build

# 运行测试
npm test
```

### 3. 发布

```bash
# 发布到 npm（会自动运行 prepublishOnly 脚本）
npm publish

# 或者发布到私有仓库
npm publish --registry=https://your-registry.com/
```

### 4. 版本管理

```bash
# 更新版本号
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 然后发布
npm publish
```

## 本地测试安装

在发布前，可以先在本地测试：

```bash
# 打包
npm pack

# 在另一个项目中测试安装
cd /path/to/test-project
npm install /path/to/tree-sitter-arkts/tree-sitter-arkts-1.0.0.tgz
```

## Windows 用户安装说明

Windows 用户在安装此包时，需要确保：

1. 已安装 Visual Studio Build Tools 或 Visual Studio（包含 C++ 工作负载）
2. 已安装 Python 2.7 或 3.x
3. 运行 `npm install` 时会自动构建原生模块

如果构建失败，可以手动构建：

```bash
npm install
npm run install  # 这会运行 node-gyp rebuild
```

