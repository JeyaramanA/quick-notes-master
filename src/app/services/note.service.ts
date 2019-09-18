import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Quicknotes } from '../models';
// key that is used to access the data in local storageconst 

@Injectable()
export class NoteService {
  anotherTodolist = [];
  STORAGE_KEY = 'local_todolist';

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  storeOnLocalStorage(quicknote: Quicknotes) {

    // get array of tasks from local storage
    const currentTodoList = this.storage.get(this.STORAGE_KEY) || [];
    // push new task to array
    currentTodoList.push(quicknote);
    // insert updated array to local storage
    this.storage.set(this.STORAGE_KEY, currentTodoList);
    // console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');
  }
}