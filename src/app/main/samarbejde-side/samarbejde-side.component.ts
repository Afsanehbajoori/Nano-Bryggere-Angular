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
  
  cooperation: Samarbejde
  cooperations: Samarbejde[];
  cooperationId: number;
  endpointO = '/Øller';
  endpointB = '/Bryggerier';
  endpointS = '/Samarbejder';
  searchkey: string;
  beerId: number;
  brewery: Bryggeri;
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
        localStorage.setItem('sOlId', JSON.stringify(id));
        this.showCooperationComponent = !this.showCooperationComponent;
        break;
      }
    }
  }

  onLoadCooperation() {
    if (this.breweryId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpointS).subscribe((data) => {
        this.cooperations = data.filter((res: any) => {
          return res.bryggeriId1 === this.breweryId || res.bryggeriId2 === this.breweryId;
        });
        this.cooperations.forEach(function (value){
          console.log("Value",value.olId);
        })
      })
    }
  }

  onUpdateBeer(id: any) {
    this.router.navigate(['../main/samarbejderediger/', id]);
  };
}