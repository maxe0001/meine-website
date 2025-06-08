import * as api from './bbq-api.js';

const app    = document.getElementById('app');
const search = document.getElementById('search');
const sort   = document.getElementById('sort');
const btnNew = document.getElementById('btn-new');

let recipes = [];

async function load() {
  recipes = await api.getAll();
  renderList();
}

// Liste anzeigen
function renderList() {
  const q   = search.value.toLowerCase();
  const key = sort.value;
  const list = recipes
    .filter(r => r.title.toLowerCase().includes(q))
    .sort((a,b)=> a[key].localeCompare ? a[key].localeCompare(b[key]) : a[key]-b[key]);

  app.innerHTML = list.map(card).join('');
}

// Einzelnes Rezept als Card
function card({id, title, image, createdAt}) {
  return /*html*/`
    <article class="bg-zinc-900 rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer flex flex-col overflow-hidden" data-id="${id}">
      <img src="${image}" alt="${title}" class="h-48 w-full object-cover">
      <div class="p-4 flex-1 flex flex-col justify-between">
        <h2 class="font-bold text-xl mb-1">${title}</h2>
        <p class="text-xs text-zinc-400">${createdAt ?? ''}</p>
      </div>
    </article>
  `;
}

// Detailansicht anzeigen
function renderDetail(recipe) {
  app.innerHTML = `
    <div class="bg-zinc-900 rounded-lg shadow-lg p-8 max-w-xl mx-auto">
      <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-64 object-cover rounded mb-4">
      <h2 class="text-3xl font-bold mb-2">${recipe.title}</h2>
      <p class="text-xs text-zinc-400 mb-4">Erstellt am ${recipe.createdAt}</p>
      <ul class="list-disc pl-5 mb-6">${recipe.steps.map(step=>`<li>${step}</li>`).join('')}</ul>
      <div class="flex gap-2">
        <button class="bg-amber-500 text-black rounded px-4 py-2 font-bold" id="edit">Bearbeiten</button>
        <button class="bg-red-600 text-white rounded px-4 py-2 font-bold" id="delete">Löschen</button>
        <button class="bg-zinc-600 text-white rounded px-4 py-2" id="back">Zurück</button>
      </div>
    </div>
  `;
  document.getElementById('back').onclick = renderList;
  // Hier kannst du Bearbeiten/Löschen ergänzen!
}

// Event-Listener
app.addEventListener('click', e=>{
  const art = e.target.closest('article');
  if(!art) return;
  const id = art.dataset.id;
  const recipe = recipes.find(r => r.id == id);
  if(recipe) renderDetail(recipe);
});

search.oninput = renderList;
sort.onchange  = renderList;
btnNew.onclick = () => {
  // Hier könnte ein Modal oder ein neues Rezeptformular erscheinen!
  alert('Hier kommt das Formular für ein neues Rezept!');
};

// Initial laden
load();