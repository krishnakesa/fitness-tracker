import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuth = false;
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

  onClose() {
    this.closeSidenav.emit();
  }

  onLogOut() {
    this.onClose();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
