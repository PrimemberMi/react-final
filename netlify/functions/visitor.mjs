import fs from 'node:fs';
import path from 'node:path';

export default async (req) => {
  // 课件逻辑：通过文件持久化存储数字
  const filePath = path.resolve('count.txt');
  let count = 0;

  try {
    // 1. 读取旧数据
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      count = parseInt(data) || 0;
    }

    // 2. 增加次数
    count++;

    // 3. 写入文件（确保下次刷新能接着数）
    fs.writeFileSync(filePath, count.toString());

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("后端出错:", err);
    return new Response(JSON.stringify({ count: "Error" }), { status: 500 });
  }
};