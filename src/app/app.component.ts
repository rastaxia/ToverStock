import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  hideMenu = false;
  pageTitle: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Get the route's title from the activated route
      const title = this.route.snapshot.firstChild?.data['title'] || 'Default Title';
      this.pageTitle = title;
    });
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route)
    ).subscribe((event) => {
      // Get the route's hideMenu from the activated route defaulting to false
      this.hideMenu = this.route.snapshot.firstChild?.data['hideMenu'] || false;
    });
  }
}
