import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared/animations/router.animations';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class LoansComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
