import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Samarbejde } from 'src/app/Models/Samarbejde';
import { RestApiService } from 'src/app/shared/rest-api.service';

interface Search {
  name: string;
  children?: Search[];
}

const TREE_DATA: Search[] = [
  {
    name: 'Vis Katalog'
  }
];

@Component({
  selector: 'app-samarbejde-side',
  templateUrl: './samarbejde-side.component.html',
  styleUrls: ['./samarbejde-side.component.css']
})

export class SamarbejdeSideComponent implements OnInit {
  showSamarbejdeComponent:boolean=false;
  showSamarbejdeKatalog:boolean=false;
  showSamarbejdeSideComponent:boolean=false;
  dataSource = new MatTreeNestedDataSource<Search>();
  treeControl = new NestedTreeControl<Search>(node => node.children);

  samarbejde: Samarbejde
  samarbejder: Samarbejde[];
  samarbejdeId: number;
  endpointO = '/Øller';
  endpointB = '/Bryggerier';
  endpointS = '/Samarbejder';
  searchkey: string;
  olId: number;
  bryggeri: Bryggeri;
  bryggeriId: number;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {  this.dataSource.data = TREE_DATA; }
  hasChild = (_: number, node: Search) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    // this.bryggeriId=JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.olId=JSON.parse(localStorage.getItem('olId') || '{}');
    this.samarbejdeId=JSON.parse(localStorage.getItem('samarbejdeId') || '{}');
    this.onHentSamarbejde();
  }

  onShowComponent(nodeName: string, id: any) {
    switch (nodeName) {
      case 'Vis Katalog': {
        this.showSamarbejdeKatalog=!this.showSamarbejdeKatalog;
       localStorage.setItem('samarbejdeId', JSON.stringify(id));
        this.showSamarbejdeComponent = !this.showSamarbejdeComponent;
        break;
      }
    }
  }

   onHentSamarbejde() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpointS).subscribe((data) => {
        // this.samarbejder = data;
        this.samarbejder = data.filter((res: any) => {
          return res.bryggeriId1 === this.bryggeriId || res.bryggeriId2 === this.bryggeriId;
        });
        this.samarbejder.forEach(function (value){
        })
      })
    }
  }

  onOpdaterOl(id: any) {
    this.router.navigate(['../main/samarbejd-opdater/', id]);
  };

  VisSamarbejde(){
    this.showSamarbejdeSideComponent = !this.showSamarbejdeSideComponent;
  }
}