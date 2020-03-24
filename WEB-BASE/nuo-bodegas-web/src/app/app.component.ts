import { Component } from '@angular/core';
import { LoadingScreenService } from './shared/components/loading-screen/service/loading-screen.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nuo-bodegas-web';
  showLoader: boolean;
  constructor(
    private loaderService: LoadingScreenService) {
}

ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
    });
}


}
