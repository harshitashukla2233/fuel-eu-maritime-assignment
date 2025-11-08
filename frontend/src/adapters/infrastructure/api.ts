// frontend/src/infrastructure/api.ts

const BASE_URL = "http://localhost:3000"; // Your backend URL

export async function fetchRoutes() {
  const res = await fetch(`${BASE_URL}/routes`);
  return res.json();
}

export async function fetchCB(year: number) {
  const res = await fetch(`${BASE_URL}/cb?year=${year}`);
  return res.json();
}

export async function bankCB(shipId: string, year: number) {
  const res = await fetch(`${BASE_URL}/bank`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shipId, year }),
  });
  return res.json();
}

export async function applyCB(shipId: string, year: number, cb: number) {
  const res = await fetch(`${BASE_URL}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shipId, year, cb }),
  });
  return res.json();
}

export async function createPool(year: number, members: { shipId: string }[]) {
  const res = await fetch(`${BASE_URL}/pools`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year, members }),
  });
  return res.json();
}
