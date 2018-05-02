import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared/animations/router.animations';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class ReturnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
