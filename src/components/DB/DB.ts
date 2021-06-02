export type User = {
  name: string;
  lastName: string;
  email: string;
  score: number;
};

export default class DataBase {
  public db?: IDBDatabase;

  // constructor() {
  //   // this.open();
  // }

  open(): void {
    const openRequest: IDBOpenDBRequest = window.indexedDB.open('AnnaLoft', 1);

    openRequest.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      const event = e.target as IDBOpenDBRequest;
      const thisDB = event.result;

      if (!thisDB.objectStoreNames.contains('users')) {
        thisDB.createObjectStore('users');
      }
    };

    openRequest.onsuccess = (e: Event) => {
      const event = e.target as IDBOpenDBRequest;
      this.db = event.result;
    };

    openRequest.onerror = (e) => console.log('Error:', e);
  }

  static loadData(storeName: string, id: string) {
    return new Promise((resolve, reject) => {
      const dbRequest = indexedDB.open(storeName);

      dbRequest.onerror = () => {
        reject(Error('Error text'));
      };

      dbRequest.onupgradeneeded = (ev) => {
        const event = ev.target as IDBOpenDBRequest;
        // Objectstore does not exist. Nothing to load
        event.transaction.abort();
        reject(Error('Not found'));
      };

      dbRequest.onsuccess = (ev) => {
        const event = ev.target as IDBOpenDBRequest;
        const database = event.result;
        const transaction = database.transaction([storeName]);
        const objectStore = transaction.objectStore(storeName);
        const objectRequest = objectStore.get(id);

        objectRequest.onerror = () => {
          reject(Error('Error text'));
        };

        objectRequest.onsuccess = () => {
          if (objectRequest.result) resolve(objectRequest.result);
          else reject(Error('object not found'));
        };
      };
    });
  }

  static loadAllData(storeName: string) {
    return new Promise((resolve, reject) => {
      const dbRequest = indexedDB.open(storeName);

      dbRequest.onerror = () => {
        reject(Error('Error text'));
      };

      dbRequest.onupgradeneeded = (ev) => {
        const event = ev.target as IDBOpenDBRequest;
        // Objectstore does not exist. Nothing to load
        event.transaction.abort();
        reject(Error('Not found'));
      };

      dbRequest.onsuccess = (ev) => {
        const event = ev.target as IDBOpenDBRequest;
        const database = event.result;
        const transaction = database.transaction([storeName]);
        const objectStore = transaction.objectStore(storeName);
        const objectRequest = objectStore.getAll();

        objectRequest.onerror = () => {
          reject(Error('Error text'));
        };

        objectRequest.onsuccess = () => {
          if (objectRequest.result) resolve(objectRequest.result);
          else reject(Error('object not found'));
        };
      };
    });
  }

  static saveToIndexedDB(storeName: string, object: User) {
    return new Promise(
      (resolve, reject) => {
        if (object.email === undefined) reject(Error('object has no id.'));
        const dbRequest = indexedDB.open(storeName);

        dbRequest.onerror = () => {
          reject(Error('IndexedDB database error'));
        };

        dbRequest.onupgradeneeded = (ev) => {
          const event = ev.target as IDBOpenDBRequest;
          const database = event.result;
          const objectStore = database.createObjectStore(storeName, { keyPath: 'email' });
          console.log('ObjectStore created', objectStore.name);
        };

        dbRequest.onsuccess = (ev) => {
          const event = ev.target as IDBOpenDBRequest;
          const database = event.result;
          const transaction = database.transaction([storeName], 'readwrite');
          const objectStore = transaction.objectStore(storeName);
          const objectRequest = objectStore.put(object); // Overwrite if exists

          objectRequest.onerror = () => {
            reject(Error('Error text'));
          };

          objectRequest.onsuccess = () => {
            console.log(object);
            resolve(objectRequest);
          };
        };
      },
    );
  }

  static saveUser(user: User): IDBRequest<IDBValidKey> {
    let result = null;
    DataBase.saveToIndexedDB('users', user).then((res) => {
      result = res;
    });
    DataBase.saveCookie(user.email);
    return result;
  }

  static saveCookie(key: string) {
    const cookie = `user=${key}`;

    document.cookie = cookie;
  }

  static getCookie(): string {
    const userSession = document.cookie.substr(5);
    return userSession;
  }

  static async getLocalUser(): Promise<User> {
    let result = null;
    const session = DataBase.getCookie();
    if (session) {
      result = await DataBase.loadData('users', session) as User;
      return result;
    }
    return null;
  }

  static async getPlayers(): Promise<User[]> {
    const result = await DataBase.loadAllData('users') as User[];
    return result;
  }
}
