const base = "http://localhost:3000/recipes";

export async function getAll() {
  const res = await fetch(base);
  return res.json();
}
export async function get(id) {
  const res = await fetch(`${base}/${id}`);
  return res.json();
}
export async function create(recipe) {
  const res = await fetch(base, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  return res.json();
}
export async function update(id, recipe) {
  const res = await fetch(`${base}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  return res.json();
}
export async function remove(id) {
  await fetch(`${base}/${id}`, { method: "DELETE" });
}
