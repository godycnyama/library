import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared/animations/router.animations';
import { LoaningService } from '../../loaning/loaning.service';

@Component({
  selector: 'app-update-loan',
  templateUrl: './update-loan.component.html',
  styleUrls: ['./update-loan.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''},
  viewProviders: [ LoaningService ]
})
export class UpdateLoanComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
