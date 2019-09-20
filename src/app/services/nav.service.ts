import { Injectable } from '@angular/core';
import { navAction } from '../models/nav';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NavService {
  left: navAction | undefined
  right: navAction | undefined
  
  goBack() {
    this.location.back()
  }
  constructor(
    private location: Location,
    private router: Router
  ) { }

  goTo(path: any[]) {
    this.router.navigate(path)
  }
}
