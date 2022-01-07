import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const myFirstObservable = new Observable((observer: Observer<number>) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.next(5);
      observer.error('deu ruim');
      observer.complete();
    });

    myFirstObservable.subscribe(
      (n: number) => {
        console.log('myFirstObservable.subscribe ~ n', n);
      },
      (error) => {
        console.log('error', error);
      },
      () => console.log('completed.')
    );
  }
}
