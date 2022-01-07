import { Component, OnInit } from '@angular/core';
import { interval, observable, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.scss'],
})
export class ColdObservablesComponent implements OnInit {
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
        clearInterval(id);
      };
    });

    this.s1 = 'Waiting for interval... ';
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

       this.s2 = 'Waiting for interval... ';
    setInterval(() => {
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
   }, 3000)

    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 11000);
  }
}
