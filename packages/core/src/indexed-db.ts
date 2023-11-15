const idbName = "pmdr";
const idbVersion = 1;

const objectStores = {
  settings: {
    name: "settings",
    keyPath: "id",
  },
};

type ObjectStoreName = keyof typeof objectStores;

export const initIDB = (
  objectStore = objectStores["settings"]
): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(idbName, idbVersion);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      if (!event.target || !(event.target instanceof IDBOpenDBRequest)) {
        return reject(
          `IndexedDB initialization error: onupgradeneeded: ${event.target}`
        );
      }

      const idb = event.target.result;
      if (!idb.objectStoreNames.contains(objectStore.name)) {
        idb.createObjectStore(objectStore.name, {
          keyPath: objectStore.keyPath,
        });
      }
    };

    request.onsuccess = (event) => {
      if (!event.target || !(event.target instanceof IDBOpenDBRequest)) {
        return reject(
          `IndexedDB initialization error: onsuccess: ${event.target}`
        );
      }
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      if (event.target && event.target instanceof IDBOpenDBRequest) {
        reject(`IndexedDB initialization error: ${event.target.error}`);
      } else {
        reject(`IndexedDB initialization error: ${event.target}`);
      }
    };
  });
};

export const addData = async (
  objectStoreName: ObjectStoreName,
  data: unknown
): Promise<void> => {
  const db = await initIDB();
  const transaction = db.transaction([objectStoreName], "readwrite");
  const store = transaction.objectStore(objectStoreName);

  return new Promise((resolve, reject) => {
    const request = store.add(data);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(`Add data error: ${request.error}`);
  });
};

export const getById = async <T>(
  objectStoreName: ObjectStoreName,
  id: string
): Promise<T> => {
  const db = await initIDB();
  const transaction = db.transaction([objectStoreName], "readonly");
  const store = transaction.objectStore(objectStoreName);

  return new Promise((resolve, reject) => {
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(`Get data error: ${request.error}`);
  });
};

export const updateData = async <T>(
  objectStoreName: ObjectStoreName,
  id: string,
  data: T
): Promise<T> => {
  const db = await initIDB();
  const transaction = db.transaction([objectStoreName], "readwrite");
  const store = transaction.objectStore(objectStoreName);

  return new Promise((resolve, reject) => {
    const request = store.put(data, id);

    request.onsuccess = () => resolve(data);
    request.onerror = () => reject(`Update data error: ${request.error}`);
  });
};

export const deleteById = async (
  objectStoreName: ObjectStoreName,
  id: string
): Promise<void> => {
  const db = await initIDB();
  const transaction = db.transaction([objectStoreName], "readwrite");
  const store = transaction.objectStore(objectStoreName);

  return new Promise((resolve, reject) => {
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(`Delete data error: ${request.error}`);
  });
};
