import { readFileSync, writeFileSync } from 'fs';

const encrypted = readFileSync('index.html', 'utf8');
const password = 'MyQuietDiary2026!#xK9';

// PageCrypt 的解密逻辑在浏览器端运行时里，我们需要提取其中的解密函数
// 由于官方未直接导出 decryptHTML，这里用正则把加密数据提取出来手动解密
// ...（这部分较复杂，建议直接用方法一）