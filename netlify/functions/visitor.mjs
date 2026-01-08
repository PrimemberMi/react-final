// 变量放在外面实现简单的计数（线上刷新可能会重置，但能保证前台拿到数据）
let count = 0; 

export default async (req, context) => {
  count++;
  
  // 必须返回标准的 JSON 格式
  return new Response(JSON.stringify({ count: count }), {
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" 
    }
  });
};