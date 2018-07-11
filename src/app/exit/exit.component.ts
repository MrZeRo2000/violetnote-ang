import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PassDataReaderService} from '../services/pass-data-reader.service';
import {PassDataService} from '../services/pass-data.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.css']
})
export class ExitComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public passDataService: PassDataService,
    private passDataReaderService: PassDataReaderService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onExitButtonClick() {
    this.authService.resetPassword();
    this.passDataService.clearPassData();
    this.router.navigate(['']);
  }

}
