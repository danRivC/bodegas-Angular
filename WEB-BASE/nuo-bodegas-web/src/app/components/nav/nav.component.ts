import { Component, OnInit, Input } from '@angular/core';
import { AutenticationService } from 'src/app/components/login/service/autentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor( private autenticationService: AutenticationService) {
    
   }

  ngOnInit() {
    
  }
  logout(){
    this.autenticationService.logout();
  }

}
