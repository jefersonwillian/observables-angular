import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-observables-intro',
  templateUrl: './hot-observables-intro.component.html',
  styleUrls: ['./hot-observables-intro.component.scss'],
})
export class HotObservablesIntroComponent implements OnInit {
  // public subscription1: Subscription;
  public n1: number;
  public s1: string;

  // public subscription2: Subscription;
  public n2: number;
  public s2: string;

  constructor() {}

  ngOnInit(): void {}
}
