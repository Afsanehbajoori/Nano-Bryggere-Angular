import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

interface Search {
  name: string;
  children?: Search[];
}

const TREE_DATA: Search[] = [
  {
    name: 'Søge',
    children: [{name: 'Bruger'}, {name: 'Rolle'}, {name: 'Øl'} , {name: 'Events'} , {name: 'Tags'} , {name: 'Forum '} , {name: 'Certifikant '}],
  }

];


@Component({
  selector: 'app-admin-forside',
  templateUrl: './admin-forside.component.html',
  styleUrls: ['./admin-forside.component.css']
})
export class AdminForsideComponent implements OnInit {
  treeControl = new NestedTreeControl<Search>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Search>();
  showBrugerComponent:boolean=false;
  showCetifikantComponent: boolean=false;
  showOlComponent:boolean=false;
  showEventsComponent:boolean=false;
  showTagsComponent:boolean=false;

  constructor() {  this.dataSource.data = TREE_DATA;}
  hasChild = (_: number, node: Search) => !!node.children && node.children.length > 0;
  ngOnInit(): void {

  }

  showComponent(nodeName : string){
  console.log(nodeName);
  switch (nodeName)
  {
    case 'Bruger':{
      this.showBrugerComponent=!this.showBrugerComponent;
      break;
    }
    case 'Øl':{
      this.showOlComponent=!this.showOlComponent;
      break;
    }
    case 'Events':{
      this.showEventsComponent=!this.showEventsComponent;
      break;
    }
    case 'Tags':{
      this.showTagsComponent=!this.showTagsComponent;
      break;
    }
    case 'Certifikant':{
      this.showCetifikantComponent=!this.showCetifikantComponent;
      break;
    }
  }


  }

}
