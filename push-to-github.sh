#!/bin/bash
# 推送到 GitHub 的脚本
# 使用方法: ./push-to-github.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
    echo "❌ 请提供 GitHub 用户名"
    echo "使用方法: ./push-to-github.sh YOUR_GITHUB_USERNAME"
    exit 1
fi

GITHUB_USERNAME=$1

echo "🚀 开始推送到 GitHub..."
echo ""

# 初始化 git
if [ ! -d .git ]; then
    echo "📦 初始化 Git..."
    git init
fi

# 添加文件
echo "📝 添加文件..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "Initial commit: tree-sitter-arkts package" || echo "⚠️  没有更改需要提交"

# 设置分支
echo "🌿 设置主分支..."
git branch -M main

# 添加 remote
echo "🔗 添加 GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/${GITHUB_USERNAME}/tree-sitter-arkts.git

# 推送
echo "⬆️  推送到 GitHub..."
echo ""
echo "⚠️  如果提示输入密码，使用 GitHub Personal Access Token（不是密码）"
echo "   获取令牌：https://github.com/settings/tokens"
echo ""
git push -u origin main

echo ""
echo "✅ 完成！"
echo ""
echo "📋 下一步："
echo "1. 访问：https://github.com/${GITHUB_USERNAME}/tree-sitter-arkts/settings/secrets/actions"
echo "2. 添加 NPM_TOKEN secret"
