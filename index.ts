import Parser = require('tree-sitter');
import { Tree } from 'tree-sitter';
import * as path from 'path';

// 动态加载原生绑定模块（优先使用预编译版本）
let ParserBinding: any;
try {
  // 尝试使用 node-gyp-build 加载预编译版本
  ParserBinding = require('node-gyp-build')(path.join(__dirname, '..'));
} catch (err) {
  // 回退到本地构建版本
  const rootDir = path.resolve(__dirname, '..');
  try {
    ParserBinding = require(path.join(rootDir, 'build/Release/tree_sitter_arkts_binding.node'));
  } catch (err2) {
    try {
      ParserBinding = require(path.join(rootDir, 'build/Debug/tree_sitter_arkts_binding.node'));
    } catch (err3) {
      throw new Error(
        'tree-sitter-arkts 原生模块未找到。请运行 npm install 或 npm run build 来构建模块。'
      );
    }
  }
}

/**
 * ArkTS 语言对象
 */
export const ArkTS: any = ParserBinding;

/**
 * 创建并配置一个解析器实例
 * @returns 配置好的 Parser 实例
 */
export function createParser(): Parser {
  const parser = new Parser();
  parser.setLanguage(ArkTS);
  return parser;
}

/**
 * 解析 ArkTS 源代码
 * @param sourceCode 要解析的源代码
 * @param oldTree 可选的旧语法树，用于增量解析
 * @returns 解析后的语法树
 */
export function parse(sourceCode: string, oldTree?: Tree): Tree {
  const parser = createParser();
  return parser.parse(sourceCode, oldTree);
}

// 导出 Parser 和 Tree 类以便用户可以直接使用
export { Tree };
export { Parser };

