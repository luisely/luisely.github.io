// cache.js

/**
 * Salva um valor no localStorage com TTL (em milissegundos)
 * @param {string} key - A chave do cache
 * @param {any} value - O valor a ser armazenado
 * @param {number} ttlMs - Tempo de vida em milissegundos
 */
export function setCache(key, value, ttlMs) {
  const record = {
    value,
    expiry: Date.now() + ttlMs,
  };
  localStorage.setItem(key, JSON.stringify(record));
}

/**
 * Recupera um valor do cache. Retorna null se expirado ou inválido.
 * @param {string} key - A chave do cache
 * @returns {any|null}
 */
export function getCache(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    if (!item.expiry || Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (e) {
    console.error(`Erro ao processar cache para a chave "${key}":`, e);
    localStorage.removeItem(key);
    return null;
  }
}

/**
 * Remove um item específico do cache
 * @param {string} key
 */
export function removeCache(key) {
  localStorage.removeItem(key);
}

/**
 * Limpa todas as chaves de cache que comecem com determinado prefixo
 * (útil para limpar dados relacionados a uma funcionalidade específica)
 * @param {string} prefix
 */
export function clearCacheByPrefix(prefix) {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });
}
