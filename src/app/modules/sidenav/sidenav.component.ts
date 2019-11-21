import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  title = 'ARD ORGANICS - Inventory System';
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }
  snavToggle(snav) {
    snav.toggle();
  }
}
