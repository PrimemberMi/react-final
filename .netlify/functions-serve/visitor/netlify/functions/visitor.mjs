
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/visitor.mjs
import fs from "node:fs";
import path from "node:path";
var visitor_default = async (req) => {
  const filePath = path.resolve("count.txt");
  let count = 0;
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      count = parseInt(data) || 0;
    }
    count++;
    fs.writeFileSync(filePath, count.toString());
    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("\u540E\u7AEF\u51FA\u9519:", err);
    return new Response(JSON.stringify({ count: "Error" }), { status: 500 });
  }
};
export {
  visitor_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvdmlzaXRvci5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBmcyBmcm9tICdub2RlOmZzJztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEpID0+IHtcbiAgLy8gXHU4QkZFXHU0RUY2XHU5MDNCXHU4RjkxXHVGRjFBXHU5MDFBXHU4RkM3XHU2NTg3XHU0RUY2XHU2MzAxXHU0RTQ1XHU1MzE2XHU1QjU4XHU1MEE4XHU2NTcwXHU1QjU3XG4gIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5yZXNvbHZlKCdjb3VudC50eHQnKTtcbiAgbGV0IGNvdW50ID0gMDtcblxuICB0cnkge1xuICAgIC8vIDEuIFx1OEJGQlx1NTNENlx1NjVFN1x1NjU3MFx1NjM2RVxuICAgIGlmIChmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgY29uc3QgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICBjb3VudCA9IHBhcnNlSW50KGRhdGEpIHx8IDA7XG4gICAgfVxuXG4gICAgLy8gMi4gXHU1ODlFXHU1MkEwXHU2QjIxXHU2NTcwXG4gICAgY291bnQrKztcblxuICAgIC8vIDMuIFx1NTE5OVx1NTE2NVx1NjU4N1x1NEVGNlx1RkYwOFx1Nzg2RVx1NEZERFx1NEUwQlx1NkIyMVx1NTIzN1x1NjVCMFx1ODBGRFx1NjNBNVx1Nzc0MFx1NjU3MFx1RkYwOVxuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIGNvdW50LnRvU3RyaW5nKCkpO1xuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGNvdW50IH0pLCB7XG4gICAgICBzdGF0dXM6IDIwMCxcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiXHU1NDBFXHU3QUVGXHU1MUZBXHU5NTE5OlwiLCBlcnIpO1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBjb3VudDogXCJFcnJvclwiIH0pLCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFFakIsSUFBTyxrQkFBUSxPQUFPLFFBQVE7QUFFNUIsUUFBTSxXQUFXLEtBQUssUUFBUSxXQUFXO0FBQ3pDLE1BQUksUUFBUTtBQUVaLE1BQUk7QUFFRixRQUFJLEdBQUcsV0FBVyxRQUFRLEdBQUc7QUFDM0IsWUFBTSxPQUFPLEdBQUcsYUFBYSxVQUFVLE9BQU87QUFDOUMsY0FBUSxTQUFTLElBQUksS0FBSztBQUFBLElBQzVCO0FBR0E7QUFHQSxPQUFHLGNBQWMsVUFBVSxNQUFNLFNBQVMsQ0FBQztBQUUzQyxXQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsRUFBRSxNQUFNLENBQUMsR0FBRztBQUFBLE1BQzdDLFFBQVE7QUFBQSxNQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsSUFDaEQsQ0FBQztBQUFBLEVBQ0gsU0FBUyxLQUFLO0FBQ1osWUFBUSxNQUFNLDZCQUFTLEdBQUc7QUFDMUIsV0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLEVBQUUsT0FBTyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsSUFBSSxDQUFDO0FBQUEsRUFDekU7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
