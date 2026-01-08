
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/hello.mjs
var hello_default = async () => {
  const data = {
    message: "Hello, World!"
  };
  return new Response(JSON.stringify(data));
};
export {
  hello_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvaGVsbG8ubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIG1lc3NhZ2U6IFwiSGVsbG8sIFdvcmxkIVwiLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH07Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLElBQU8sZ0JBQVEsWUFBWTtBQUN2QixRQUFNLE9BQU87QUFBQSxJQUNYLFNBQVM7QUFBQSxFQUNYO0FBQ0EsU0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLElBQUksQ0FBQztBQUMxQzsiLAogICJuYW1lcyI6IFtdCn0K
