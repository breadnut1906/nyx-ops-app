import { Component } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ MaterialUiModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent { 

  authForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

}
