import * as api from './bbq-api.js';

const app    = document.getElementById('app');
const search = document.getElementById('search');
const sort   = document.getElementById('sort');
const btnNew = document.getElementById('btn-new');
const modal  = document.getElementById('modal');

let recipes = [];

// Lade alle Rezepte und rendere die Übersicht
async function load() {
  recipes = await api.getAll();
  render();
}

// Rezepteübersicht (Karten) anzeigen
function render() {
  const q   = search.value.toLowerCase();
  const key = sort.value;
  const list = recipes
    .filter(r => r.title.toLowerCase().includes(q))
    .sort((a,b)=>
      key === 'title'
        ? a.title.localeCompare(b.title)
        : (a.createdAt||'').localeCompare(b.createdAt||'')
    );

  // Rezepte nebeneinander anordnen!
  app.innerHTML = `
    <div class="bbq-card-list">
      ${list.map(card).join('')}
    </div>
  `;
}


// Einzelne Rezeptkarte (HTML)
function card({id, title, image}) {
  return /*html*/`
    <article class="bbq-card" data-id="${id}" style="cursor:pointer;">
      <img src="${image||''}" alt="" style="max-width:100%;height:180px;object-fit:cover;border-radius:7px 7px 0 0;">
      <h2 style="padding:0.6rem 0 0.2rem 0;font-size:1.2rem;font-weight:700;color:#b36;">${title}</h2>
    </article>
  `;
}

// ---- Detailansicht-Modal ----
function showDetail(id) {
  api.get(id).then(recipe => {
    modal.innerHTML = `
      <div class="modal-bg" style="position:fixed;inset:0;z-index:10;background:#000a;display:flex;justify-content:center;align-items:center;">
        <div class="modal-content" style="background:#fff;padding:2rem 2.5rem;border-radius:14px;min-width:320px;max-width:96vw;box-shadow:0 4px 30px #0008;position:relative;">
          <button id="closeModal" style="position:absolute;top:1rem;right:1rem;font-size:2rem;background:none;border:none;cursor:pointer;">×</button>
          <h2 style="color:#333">${recipe.title}</h2>
          <img src="${recipe.image||''}" alt="" style="width:100%;max-width:380px;display:block;margin-bottom:1.3rem;border-radius:10px;">
          <p style="color:#c36;margin-bottom:1rem;">${recipe.createdAt||''}</p>
          <ol>
            ${(recipe.steps||[]).map(s=>`<li>${s}</li>`).join('')}
          </ol>
          <div style="margin-top:2rem;display:flex;gap:1rem;">
            <button id="editBtn">Bearbeiten</button>
            <button id="deleteBtn" style="color:#fff;background:#c33;">Löschen</button>
          </div>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');

    document.getElementById('closeModal').onclick = closeModal;

    document.getElementById('deleteBtn').onclick = async () => {
      if (confirm('Wirklich löschen?')) {
        await api.remove(recipe.id);
        closeModal();
        load();
      }
    };

    document.getElementById('editBtn').onclick = () => showForm(recipe);
  });
}

// Modal-Fenster schließen
function closeModal() {
  modal.innerHTML = "";
  modal.classList.add('hidden');
}

// Rezeptformular (neu/bearbeiten)
function showForm(recipe = {}) {
  const isEdit = !!recipe.id;
  modal.innerHTML = `
    <div class="modal-bg" style="position:fixed;inset:0;z-index:10;background:#000a;display:flex;justify-content:center;align-items:center;">
      <form id="recipeForm" class="modal-content" style="background:#fff;padding:2rem 2.5rem;border-radius:14px;min-width:320px;max-width:96vw;box-shadow:0 4px 30px #0008;position:relative;">
        <button type="button" id="closeModal" style="position:absolute;top:1rem;right:1rem;font-size:2rem;background:none;border:none;cursor:pointer;">×</button>
        <h2 style="color:#333">${isEdit ? "Rezept bearbeiten" : "Neues Rezept"}</h2>
        <label>Titel:<br>
          <input name="title" value="${recipe.title||''}" required style="width:100%;margin-bottom:1rem;">
        </label>
        <label>Bild-URL:<br>
          <input name="image" value="${recipe.image||''}" style="width:100%;margin-bottom:1rem;">
        </label>
        <label>Zubereitungsschritte (je Zeile ein Schritt):<br>
          <textarea name="steps" rows="5" style="width:100%;margin-bottom:1rem;">${(recipe.steps||[]).join('\n')}</textarea>
        </label>
        <label>Erstellt am:<br>
          <input name="createdAt" type="date" value="${recipe.createdAt||''}" required style="width:100%;margin-bottom:1rem;">
        </label>
        <div style="display:flex;gap:1rem;justify-content:flex-end;">
          <button type="submit" style="background:#47b046;color:#fff;padding:0.5rem 1.2rem;border:none;border-radius:6px;">${isEdit ? "Speichern" : "Anlegen"}</button>
          ${isEdit ? `<button type="button" id="cancelEdit" style="background:#eee;">Abbrechen</button>` : ""}
        </div>
      </form>
    </div>
  `;
  modal.classList.remove('hidden');

  document.getElementById('closeModal').onclick = closeModal;
  if (isEdit) document.getElementById('cancelEdit').onclick = closeModal;

  document.getElementById('recipeForm').onsubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const recipeData = {
      title: form.title.value,
      image: form.image.value,
      steps: form.steps.value.split('\n').filter(Boolean),
      createdAt: form.createdAt.value,
    };
    if (isEdit) {
      await api.update(recipe.id, recipeData);
    } else {
      await api.create(recipeData);
    }
    closeModal();
    load();
  };
}

// ---- Event-Handler ----
app.addEventListener('click', e => {
  const art = e.target.closest('article');
  if (!art) return;
  showDetail(art.dataset.id);
});
search.oninput = render;
sort.onchange  = render;
btnNew.onclick = () => showForm();

// ---- Start ----
load();
