import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable()
export class MessagesService {
  private subject = new BehaviorSubject<string[]>([]);

  errors$: Observable<string[]> = this.subject
    .asObservable()
    //filter operator jest po to żeby nie przesyłać pustej tablicy
    //jako wartości inicjalizującej bo odpali to message component
    //a nie niesie żadnej wartości
    .pipe(filter((messages) => messages && messages.length > 0));

  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }
}
