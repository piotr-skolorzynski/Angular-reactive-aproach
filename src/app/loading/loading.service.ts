import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class LoadingService {
  //BehaviorSubject pozwala zapamiętać ostatnią wartość
  //jest prywatny więc nie można się na niego subskrybować i emitować wartości
  //jest przypisany do zwykłej Observable co pozwala po subskrybcji na niej
  //korzystać z info czy spinner ma być odpalony
  private loadingSubject = new BehaviorSubject<boolean>(false);

  //emituje flagę przesłaną przez BehaviorSubject
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  //ta metoda pozwala poprzez operator tap zrobić side effect, którego wynikiem
  //jest właśnie flaga czy należy włączyć spinner a jako wewnętrzną subskrybcję
  // realizowaną przez flattening operator np. concatMap
  //odpalana jest przekazana referencja do Observable wykonująca jakąś czynność
  //asynchroniczną
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
