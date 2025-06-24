import * as api from './bbq-api.js';

const app = document.getElementById('app');
const search = document.getElementById('search');
const sort = document.getElementById('sort');
const btnNew = document.getElementById('btn-new');
const modal = document.getElementById('modal');

let recipes = [];

// =================================================================
// RENDERING DER HAUPTANSICHT
// =================================================================

async function load() {
  recipes = await api.getAll();
  render();
}

function render() {
  const q = search.value.toLowerCase();
  const key = sort.value;
  const list = recipes
    .filter(r => r.title.toLowerCase().includes(q))
    .sort((a, b) =>
      key === 'title'
        ? a.title.localeCompare(b.title)
        : (a.createdAt || '').localeCompare(b.createdAt || '')
    );

  app.innerHTML = list.map(card).join('');
}

function card({ id, title, image }) {
  // Wichtig: Das src-Attribut kann sowohl http-URLs als auch Base64-Daten-URLs verarbeiten.
  return /*html*/`
    <article class="bbq-card" data-id="${id}">
      <img src="${image || 'https://placehold.co/320x180/fff7eb/333?text=Kein+Bild'}" alt="Vorschaubild für ${title}" style="width:100%;height:180px;object-fit:cover;">
      <div class="bbq-title">${title}</div>
    </article>
  `;
}


// =================================================================
// MODAL-LOGIK: DETAILANSICHT, FORMULAR & BILD-UPLOAD
// =================================================================

function showDetail(id) {
  api.get(id).then(recipe => {
    modal.innerHTML = `
      <div class="modal-bg">
        <div class="modal-content">
          <button id="closeModal" class="modal-close-btn">×</button>
          <h2>${recipe.title}</h2>
          <img src="${recipe.image || 'https://placehold.co/400x225/fff7eb/333?text=Kein+Bild'}" alt="" class="modal-image">
          <p class="modal-date">${recipe.createdAt || ''}</p>
          <div class="modal-steps">
            <h4>Zubereitung:</h4>
            <ol>
              ${(recipe.steps || []).map(s => `<li>${s}</li>`).join('')}
            </ol>
          </div>
          <div class="modal-actions">
            <button id="editBtn" class="btn">Bearbeiten</button>
            <button id="deleteBtn" class="btn btn-danger">Löschen</button>
          </div>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');

    document.getElementById('closeModal').onclick = closeModal;
    document.getElementById('deleteBtn').onclick = async () => {
      // Custom Confirm-Dialog statt window.confirm
      if (await showConfirm('Soll das Rezept wirklich gelöscht werden?')) {
        await api.remove(recipe.id);
        closeModal();
        load();
      }
    };
    document.getElementById('editBtn').onclick = () => showForm(recipe);
  });
}

function closeModal() {
  modal.innerHTML = "";
  modal.classList.add('hidden');
}

// -- Rezeptformular (neu/bearbeiten) --
function showForm(recipe = {}) {
  const isEdit = !!recipe.id;
  const imageUrl = recipe.image || '';

  modal.innerHTML = `
    <div class="modal-bg">
      <form id="recipeForm" class="modal-content">
        <button type="button" id="closeModal" class="modal-close-btn">×</button>
        <h2>${isEdit ? "Rezept bearbeiten" : "Neues Rezept"}</h2>
        
        <label>Titel:</label>
        <input name="title" value="${recipe.title || ''}" required>
        
        <!-- NEU: Drag-and-Drop-Bereich für Bilder -->
        <label>Bild:</label>
        <div id="drop-zone" class="drop-zone">
            <span class="drop-zone-prompt">Bild hierher ziehen<br>oder klicken zum Auswählen</span>
            <input type="file" id="file-input" accept="image/*" style="display: none;">
            <img id="image-preview" class="image-preview" src="" alt="Bildvorschau"/>
        </div>
        
        <label>Zubereitungsschritte (je Zeile ein Schritt):</label>
        <textarea name="steps" rows="5">${(recipe.steps || []).join('\n')}</textarea>
        
        <label>Erstellt am:</label>
        <input name="createdAt" type="date" value="${recipe.createdAt || new Date().toISOString().split('T')[0]}" required>
        
        <div class="modal-actions">
          <button type="submit" class="btn btn-primary">${isEdit ? "Speichern" : "Anlegen"}</button>
          ${isEdit ? `<button type="button" id="cancelEdit" class="btn">Abbrechen</button>` : ""}
        </div>
      </form>
    </div>
  `;
  modal.classList.remove('hidden');

  // NEU: Die Logik für den Bild-Upload wird initialisiert
  setupImageUpload(imageUrl);

  document.getElementById('closeModal').onclick = closeModal;
  if (isEdit) document.getElementById('cancelEdit').onclick = () => showDetail(recipe.id); // Zurück zur Detailansicht

  document.getElementById('recipeForm').onsubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const dropZone = document.getElementById('drop-zone');

    const recipeData = {
      title: form.title.value,
      // NEU: Bilddaten aus dem dataset der Drop-Zone lesen
      image: dropZone.dataset.imageDataUrl || imageUrl,
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


/**
 * NEU: Initialisiert die Drag-and-Drop-Funktionalität für den Bild-Upload.
 * @param {string} initialImageUrl - Eine bereits vorhandene Bild-URL (Base64 oder http) zur Anzeige.
 */
function setupImageUpload(initialImageUrl) {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('image-preview');

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageDataUrl = e.target.result;
                imagePreview.src = imageDataUrl;
                imagePreview.style.display = 'block';
                dropZone.classList.add('has-image');
                // Speichere das Ergebnis im Dataset, damit wir beim Speichern darauf zugreifen können
                dropZone.dataset.imageDataUrl = imageDataUrl;
            };
            reader.readAsDataURL(file); // Liest die Datei als Base64-Daten-URL
        } else {
            showConfirm("Bitte nur Bilddateien (z.B. JPG, PNG) auswählen.");
        }
    };
    
    // Wenn eine initiale Bild-URL vorhanden ist (beim Bearbeiten), zeige sie an
    if (initialImageUrl) {
        imagePreview.src = initialImageUrl;
        imagePreview.style.display = 'block';
        dropZone.classList.add('has-image');
    }

    // Event-Listener
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) handleFile(fileInput.files[0]);
    });
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleFile(e.dataTransfer.files[0]);
        }
    });
}

/**
 * Zeigt einen benutzerdefinierten Confirm-Dialog an.
 * @param {string} message - Die anzuzeigende Nachricht.
 * @returns {Promise<boolean>} - True, wenn der Benutzer bestätigt, sonst false.
 */
function showConfirm(message) {
  return new Promise(resolve => {
    const confirmModal = document.createElement('div');
    confirmModal.className = 'confirm-modal-overlay';
    confirmModal.innerHTML = `
      <div class="confirm-modal-box">
        <p>${message}</p>
        <div class="confirm-modal-actions">
          <button class="btn confirm-yes">Ja</button>
          <button class="btn confirm-no">Nein</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmModal);

    confirmModal.querySelector('.confirm-yes').onclick = () => {
      document.body.removeChild(confirmModal);
      resolve(true);
    };
    confirmModal.querySelector('.confirm-no').onclick = () => {
      document.body.removeChild(confirmModal);
      resolve(false);
    };
  });
}


// =================================================================
// GLOBALE EVENT-HANDLER
// =================================================================

app.addEventListener('click', e => {
  const card = e.target.closest('.bbq-card');
  if (card) {
    showDetail(card.dataset.id);
  }
});
search.oninput = render;
sort.onchange = render;
btnNew.onclick = () => showForm();


// ---- Start der Anwendung----
load();
