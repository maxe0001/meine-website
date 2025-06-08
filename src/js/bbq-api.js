const API = 'http://localhost:3000/recipes';

export const getAll  = () => fetch(API).then(r=>r.json());
export const getOne  = id => fetch(`${API}/${id}`).then(r=>r.json());
export const create  = data => fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(r=>r.json());
export const update  = (id,data)=> fetch(`${API}/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(r=>r.json());
export const remove  = id => fetch(`${API}/${id}`,{method:'DELETE'});