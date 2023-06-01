const _fetch = (
  input: RequestInfo | URL,
  init?: RequestInit & { timeout?: number },
) => {

  const _init: RequestInit = {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      ...init?.headers
    },
   //  cache: 'no-store',
  };
  return fetch(
    `http://localhost:3000/${input}`,
    _init
  );
};

export default _fetch;