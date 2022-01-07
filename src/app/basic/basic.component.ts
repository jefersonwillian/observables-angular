import { Component, OnInit } from '@angular/core';
import { interval, observable, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  public subscription1: Subscription;
  public n1: number;
  public s1: string;

  public subscription2: Subscription;
  public n2: number;
  public s2: string;

  constructor() {}

  ngOnInit(): void {
    this.s1 = 'Initializing... ';
    this.s2 = 'Initializing... ';

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

    // const timeCount = interval(1000);
    // timeCount.subscribe((n) => {
    //   console.log('n', n)
    // })
    // console.log('after interval')

    const myIntervalObservable = new Observable((observable: Observer<any>) => {
      let i: number = 0;
      let id = setInterval(() => {
        i++;
        console.log('from Observable: ', i);

        if (i == 10) {
          observable.complete();
        } else if (i % 2 == 0) {
          observable.next(i);
        }
      }, 1000);
      return () => {
        clearInterval(id)
      }
    });

    this.subscription1 = myIntervalObservable.subscribe(
      (_n) => {
        this.n1 = _n;
      },
      (error) => {
        this.s1 = 'Error: ' + error;
      },
      () => {
        this.s1 = 'Completed';
      }
    );

    this.subscription2 = myIntervalObservable.subscribe(
      (_n) => {
        this.n2 = _n;
      },
      (error) => {
        this.s2 = 'Error: ' + error;
      },
      () => {
        this.s2 = 'Completed';
      }
    );

    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 11000);
  }
}
