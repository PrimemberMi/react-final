
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/visitor.mjs
var count = 0;
var visitor_default = async (req) => {
  count++;
  const data = {
    count
  };
  return new Response(JSON.stringify(data));
};
export {
  visitor_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvdmlzaXRvci5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImxldCBjb3VudCA9IDA7IFxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxKSA9PiB7XG4gIGNvdW50Kys7XG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgY291bnQ6IGNvdW50LFxuICB9O1xuXG4gIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxRQUFRO0FBRVosSUFBTyxrQkFBUSxPQUFPLFFBQVE7QUFDNUI7QUFDQSxRQUFNLE9BQU87QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUVBLFNBQU8sSUFBSSxTQUFTLEtBQUssVUFBVSxJQUFJLENBQUM7QUFDMUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
