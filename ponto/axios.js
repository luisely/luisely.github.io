
export const api = axios.create({
  baseURL: 'https://t6d9wao8qd.execute-api.us-east-1.amazonaws.com/',
  timeout: 1000,
});



export const local = axios.create({
  baseURL: 'http://127.0.0.1:5500/html/luisely.github.io/ponto/mock/pontos.json',
  timeout: 1000,
});