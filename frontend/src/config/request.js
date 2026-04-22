const site = "http://localhost:3000/";
const postReq = async (surl, data = {}, token) => {
  const res = await fetch(site + surl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  const dat = await res.json();
  console.log(dat);

  return dat;
};

const putReq = async (surl, data = {}, token) => {
  const res = await fetch(site + surl, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  const dat = await res.json();
  return dat;
};

const getReq = async (surl, token) => {
  const res = await fetch(site + surl, {
    headers: { ...(token && { authorization: `Bearer ${token}` }) },
  });
  const dat = await res.json();
  return dat;
};

export { postReq, putReq, getReq, site };
