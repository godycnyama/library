import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared/animations/router.animations';


@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class CreateLoanComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
