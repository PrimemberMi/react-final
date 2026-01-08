// 模拟数据库（重启 netlify dev 会清空，稍后可接入真正数据库）
let savedAnimes = {}; 

exports.handler = async (event) => {
  const method = event.httpMethod;

  // 接收保存请求
  if (method === "POST") {
    const { id, status } = JSON.parse(event.body);
    if (!status) {
      delete savedAnimes[id];
    } else {
      savedAnimes[id] = status; // 存储如 { 1535: "WANT" }
    }
    return { statusCode: 200, body: JSON.stringify(savedAnimes) };
  }

  // 获取所有记忆的 ID
  if (method === "GET") {
    return { statusCode: 200, body: JSON.stringify(savedAnimes) };
  }
};