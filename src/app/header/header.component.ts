import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/config/auth.service';
import { FormApiService } from '../services/config/form-api-service.service';
import menuGroupingJson from '../data/menu-grouping.json';
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
  groupedMenu: any[] = [];
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
          this.buildMenu(res.data, menuGroupingJson);
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

  buildMenu(apiForms: any[], groupingConfig: any) {
    debugger;
    const formNames = apiForms.map(f => f.formName);

    const result: any[] = [];

    for (const moduleName of Object.keys(groupingConfig)) {
      const module = groupingConfig[moduleName];
      const moduleNode: any = {
        name: moduleName,
        open: false,
        children: []
      };

      for (const groupName of Object.keys(module)) {
        const items = module[groupName]
          .filter((name: string) => formNames.includes(name))
          .map((name: string) => ({
            label: name,
            route: `/form/${name}`
          }));

        if (items.length) {
          moduleNode.children.push({
            name: groupName,
            open: false,
            items
          });
        }
      }

      if (moduleNode.children.length) {
        result.push(moduleNode);
      }
    }

    this.groupedMenu = result;
  }
  // Close menu on outside click
  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: MouseEvent) {
  //   if (this.menuOpen) {
  //     this.closeMenu();
  //   }
  // }
}
