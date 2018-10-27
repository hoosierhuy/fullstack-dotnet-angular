import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Output emits an event to parent component
  @Output() cancelRegister: EventEmitter<any> = new EventEmitter();
  
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      () => console.log('registration successful'),
      error => console.log(error, 'Error in register() method'));
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
