import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/config/auth.service';
import { FormApiService } from '../services/config/form-api-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isLoggedIn = false;
  forms: string[] = [];
    userName: string | null = null;
  constructor(private auth: AuthService, private formService: FormApiService) {
    this.isLoggedIn = this.auth.getClientId() ? true : false;
    
    this.userName = this.auth.getUserName();
  }
  ngOnInit(): void {
    if (!this.auth.getClientId()) {
      this.auth.logout();
      this.isLoggedIn = false;
      return;
    }
    this.formService.get(this.auth.getClientId() || "").subscribe({
      next: (res) => {
        if (res.success) {
          this.forms = res.data.map(f => f.formName);
        }
      },
      error: () => {
        // Handle error case
      }
    })
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
logout() {
    this.auth.logout();
    this.isLoggedIn = false;
  }
adminExpanded = false;
accountingExpanded = false;
settingsExpanded = false;
  
   // Close menu on outside click
  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: MouseEvent) {
  //   if (this.menuOpen) {
  //     this.closeMenu();
  //   }
  // }
}
