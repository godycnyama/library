import { ChangeDetectorRef,Component } from '@angular/core';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LibrarySYS';
  constructor(public changeDetectorRef: ChangeDetectorRef,public media: TdMediaService) {}
}
