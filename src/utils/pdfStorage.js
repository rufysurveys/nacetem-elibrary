/**
 * IndexedDB storage utility for storing and retrieving large PDF files, Data URLs,
 * and multi-component chapter files without hitting the 5MB browser localStorage quota limit.
 */
const DB_NAME = 'NACETEM_PDF_STORAGE';
const DB_VERSION = 1;
const STORE_NAME = 'pdf_files';

function openPdfDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('IndexedDB open error:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Stores a PDF Data URL or Blob in IndexedDB by paper ID or component key
 */
export async function savePdfToStorage(key, pdfDataUrl) {
  if (!key || !pdfDataUrl) return;
  try {
    const db = await openPdfDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(pdfDataUrl, key);
      req.onsuccess = () => resolve(true);
      req.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.error('Failed to save PDF to IndexedDB:', err);
  }
}

/**
 * Retrieves a PDF Data URL from IndexedDB by paper ID or component key
 */
export async function getPdfFromStorage(key) {
  if (!key) return null;
  try {
    const db = await openPdfDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.error('Failed to retrieve PDF from IndexedDB:', err);
    return null;
  }
}

/**
 * Deletes a PDF file from IndexedDB by paper ID or component key
 */
export async function deletePdfFromStorage(key) {
  if (!key) return;
  try {
    const db = await openPdfDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch (err) {
    console.error('Failed to delete PDF from IndexedDB:', err);
  }
}
