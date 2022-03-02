import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  onClickMenu(){
    return this.router.navigate(['../main/main']);
  }
}
