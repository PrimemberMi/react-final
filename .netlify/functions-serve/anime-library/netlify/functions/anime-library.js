// netlify/functions/anime-library.mjs
var savedAnimes = {};
exports.handler = async (event) => {
  const method = event.httpMethod;
  if (method === "POST") {
    const { id, status } = JSON.parse(event.body);
    if (!status) {
      delete savedAnimes[id];
    } else {
      savedAnimes[id] = status;
    }
    return { statusCode: 200, body: JSON.stringify(savedAnimes) };
  }
  if (method === "GET") {
    return { statusCode: 200, body: JSON.stringify(savedAnimes) };
  }
};
//# sourceMappingURL=anime-library.js.map
