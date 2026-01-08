
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/visitor.mjs
var count = 0;
var visitor_default = async (req, context) => {
  count++;
  return new Response(JSON.stringify({ count }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
};
export {
  visitor_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvdmlzaXRvci5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIFx1NTNEOFx1OTFDRlx1NjUzRVx1NTcyOFx1NTkxNlx1OTc2Mlx1NUI5RVx1NzNCMFx1N0I4MFx1NTM1NVx1NzY4NFx1OEJBMVx1NjU3MFx1RkYwOFx1N0VCRlx1NEUwQVx1NTIzN1x1NjVCMFx1NTNFRlx1ODBGRFx1NEYxQVx1OTFDRFx1N0Y2RVx1RkYwQ1x1NEY0Nlx1ODBGRFx1NEZERFx1OEJDMVx1NTI0RFx1NTNGMFx1NjJGRlx1NTIzMFx1NjU3MFx1NjM2RVx1RkYwOVxubGV0IGNvdW50ID0gMDsgXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIGNvbnRleHQpID0+IHtcbiAgY291bnQrKztcbiAgXG4gIC8vIFx1NUZDNVx1OTg3Qlx1OEZENFx1NTZERVx1NjgwN1x1NTFDNlx1NzY4NCBKU09OIFx1NjgzQ1x1NUYwRlxuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgY291bnQ6IGNvdW50IH0pLCB7XG4gICAgaGVhZGVyczogeyBcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIgXG4gICAgfVxuICB9KTtcbn07Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUNBLElBQUksUUFBUTtBQUVaLElBQU8sa0JBQVEsT0FBTyxLQUFLLFlBQVk7QUFDckM7QUFHQSxTQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsRUFBRSxNQUFhLENBQUMsR0FBRztBQUFBLElBQ3BELFNBQVM7QUFBQSxNQUNQLGdCQUFnQjtBQUFBLE1BQ2hCLCtCQUErQjtBQUFBLElBQ2pDO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
