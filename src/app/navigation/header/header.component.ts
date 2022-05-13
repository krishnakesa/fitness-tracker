import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter();
  isAuth = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        //When a user is either registered or logged in or logged out then the Subject in the service file informs the components
        //that inject the Service. The value that is returned by the Subject(when .next() is executed) is available to access in the authStatus variable.
        this.isAuth = authStatus;
      }
    );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
