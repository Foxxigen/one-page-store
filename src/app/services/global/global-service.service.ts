import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  private gameListToToolbar: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public gameListToToolbar$: Observable<string> = this.gameListToToolbar.asObservable();
  private gameId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public gameId$: Observable<string> = this.gameId.asObservable();


  constructor() { }

  setGameListToToolbar(list) {
    this.gameListToToolbar.next(JSON.stringify(list));
  }

  passGameIdToFrontPage(id) {
    this.gameId.next(JSON.stringify(id));
  }

}
