import { openDB } from 'idb';

const DB_NAME = 'upsDB';
const STORE_NAME = 'upsStore';
const VERSION = 1;

const initDB = async () => {
  return openDB(DB_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveDataToIndexedDB = async (data) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  for (const item of data) {
    await store.add(item);
  }
  await tx.done;
};

export const getDataFromIndexedDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return await store.getAll();
};