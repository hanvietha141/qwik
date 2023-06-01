// import API from "../aixos"

import _fetch from "../fetch";

export const getPosts = async () => {
  const resp = await _fetch("posts", { method: "GET" });
  const posts = await resp.json();
  return posts;
};

export const getPostDetail = async (id: any) => {
  const resp = await _fetch(`posts/${id}`);
  const posts = await resp.json();
  return posts;
};

export const fandeloApi = async () => {
  const resp = await fetch("https://test.fandelo.com/api/portal/admin/news", {
    method: "POST",
    headers: {
      Authorization: "Bearer ZTpWbD6z8eZYdUcRNeosB8Mb_fs",
      "Content-Type": "application/json",
      'Accept': 'application/json, text/plain, */*',
    },
    body: JSON.stringify({
      orderBy: null,
      orderDirection: null,
      schedule: "false",
      statuses: [1],
      keyword: "",
      fromDate: null,
      toDate: null,
      userIds: [],
      cmsTabId: 3,
      hiveFlag: null,
      pageSize: 50,
      pageIndex: 0,
    }),
  });
  const data = await resp.json();
  return data;
};

export const fandeloApiGetDetail = async (id) => {
  const resp = await fetch("https://test.fandelo.com/api/portal/admin/news"+'/'+id, {
    method: "GET",
    headers: {
      Authorization: "Bearer ZTpWbD6z8eZYdUcRNeosB8Mb_fs",
      "Content-Type": "application/json",
      'Accept': 'application/json, text/plain, */*',
    },
  });
  const data = await resp.json();
  return data;
};
