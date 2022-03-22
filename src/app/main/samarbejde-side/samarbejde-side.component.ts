import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Brewery } from 'src/app/Models/Brewery';
import { Cooperation } from 'src/app/Models/Cooperation';
import { RestApiService } from 'src/app/shared/rest-api.service';

interface Search {
  name: string;
  children?: Search[];
}

const TREE_DATA: Search[] = [
  {
    name: 'Vis',
    children: [{ name: 'Bruger'}],
  }
];

@Component({
  selector: 'app-samarbejde-side',
  templateUrl: './samarbejde-side.component.html',
  styleUrls: ['./samarbejde-side.component.css']
})

export class SamarbejdeSideComponent implements OnInit {
  showCooperationComponent:boolean=false;
  dataSource = new MatTreeNestedDataSource<Search>();
  treeControl = new NestedTreeControl<Search>(node => node.children);
  
  cooperation: Cooperation
  cooperations: Cooperation[];
  cooperationId: number;
  endpointO = '/Øller';
  endpointB = '/Bryggerier';
  endpointS = '/Samarbejder';
  searchkey: string;
  beerId: number;
  brewery: Brewery;
  breweryId: number;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {  this.dataSource.data = TREE_DATA; }
  hasChild = (_: number, node: Search) => !!node.children && node.children.length > 0;
  ngOnInit(): void {
    this.onLoadCooperation();
    // this.onLoadOl();
  }
  onshowComponent(nodeName: string, id: any) {
    console.log(this.cooperations);
    switch (nodeName) {
      case 'Vis': {
        localStorage.setItem('cooperationBeerId', JSON.stringify(id));
        this.showCooperationComponent = !this.showCooperationComponent;
        break;
      }
    }
  }

  onLoadCooperation() {
    if (this.breweryId = JSON.parse(localStorage.getItem('breweryId') || '{}')) {
      this.restApi.getDatas(this.endpointS).subscribe((data) => {
        this.cooperations = data.filter((res: any) => {
          return res.breweryId1 === this.breweryId || res.breweryId2 === this.breweryId;
        });
        this.cooperations.forEach(function (value){
          console.log("Value",value.beerId);
        })
      })
    }
  }

  onUpdateBeer(id: any) {
    this.router.navigate(['../main/cooperationupdate/', id]);
  };
}