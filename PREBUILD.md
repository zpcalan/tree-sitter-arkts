# 预编译二进制文件说明

## 概述

为了确保 Windows 用户无需重新编译，本包使用 `prebuildify` 预编译多个平台的二进制文件。

## 预编译平台

- **Windows** (win32): x64
- **Linux**: x64, arm64
- **macOS** (darwin): x64, arm64

## 发布前准备

在发布到 npm 之前，需要为所有支持的平台预编译二进制文件：

```bash
# 预编译所有平台（需要相应的构建环境）
npm run prebuild

# 或者分别预编译各个平台
npm run prebuild:win32   # 在 Windows 上运行
npm run prebuild:linux   # 在 Linux 上运行
npm run prebuild:darwin  # 在 macOS 上运行
```

## 使用 GitHub Actions 自动预编译（推荐）

可以在 `.github/workflows/prebuild.yml` 中配置 GitHub Actions 来自动为所有平台预编译：

```yaml
name: Prebuild

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
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run prebuild
      - uses: actions/upload-artifact@v3
        with:
          name: prebuilds-${{ matrix.os }}
          path: prebuilds/
```

## 用户安装

用户安装时，`node-gyp-build` 会自动查找并加载对应平台的预编译二进制文件：

- 如果找到预编译版本，直接使用，无需编译
- 如果未找到，回退到本地编译（需要构建工具）

## 注意事项

1. **预编译文件大小**: 预编译的二进制文件会增加包的大小，但可以避免用户需要安装构建工具
2. **Node.js 版本**: 预编译文件针对特定的 Node.js ABI 版本，需要为多个 Node.js 版本预编译
3. **发布流程**: 确保在 `prepublishOnly` 脚本中运行预编译，或使用 CI/CD 自动预编译


