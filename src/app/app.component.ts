import { Component, OnInit } from '@angular/core';
import { Chartdata } from './interface/chartdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'responsive';
  ngOnInit(): void {

  }

  toggleNavbar() {
    const navLinks = document.getElementById('navLinks') as HTMLElement;
    navLinks.classList.toggle('show');
  }

}
