import { Injectable } from '@angular/core';

@Injectable()
export class LocalDataStorageService {

    getLocalDataStorage(key: string): any {
        return localStorage.getItem(key);
    }

    putLocalDataStorage(data: any, key: string): void {
        localStorage.setItem(key, data);
    }

    clear() {
        localStorage.clear();
    }


}