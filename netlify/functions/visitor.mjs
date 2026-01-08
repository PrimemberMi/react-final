let count = 0; 

export default async (req) => {
  count++;
  const data = {
    count: count,
  };

  return new Response(JSON.stringify(data));
};