import { Inject, Injectable } from '@angular/core';
import {
  LOCAL_STORAGE,
  StorageService,
} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  init(key: string, value: any) {
    this.storage.set(key, value);
  }

  setRoot(key: string, value: any) {
    this.init(key, value);
  }

  set(rootKey: string, key: string, value: any) {
    if (!this.storage.has(rootKey)) {
      this.log(`Set: ${rootKey}: Does not exist`);
    }
    const currentState = this.storage.get(rootKey);
    currentState[key] = value;
    this.storage.set(rootKey, currentState);
    this.log(`Set: ${rootKey}.${key} = ${value}`);
  }

  getRoot(key: string) {
    return this.storage.get(key);
  }

  get(rootKey: string, key: string) {
    const obj = this.storage.get(rootKey);
    if (obj && key in obj) {
      return obj[key];
    }
    this.log(`Get: ${rootKey}.${key}: Does not exist`);
    return '';
  }

  deleteRoot(key: string) {
    this.storage.remove(key);
  }

  delete(rootKey: string, key: string) {
    if (!this.storage.has(rootKey)) {
      this.log(`Delete: ${rootKey}: Does not exist`);
    }
    const currentState = this.storage.get(rootKey);
    delete currentState.key;
    this.storage.set(rootKey, currentState);
    this.log(`Delete: ${rootKey}.${key}: deleted`);
  }

  clear() {
    this.storage.clear();
  }

  log(msg: string) {
    this.log('localStorageService: ' + msg);
  }
}
