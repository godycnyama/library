import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared/animations/router.animations';


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class IssueComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
