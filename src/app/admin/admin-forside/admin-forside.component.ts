import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

interface Search {
  name: string;
  children?: Search[];
}

const TREE_DATA: Search[] = [
  {
    name: 'Søge',
    children: [{name: 'Bruger', children:[{name: 'Med BrugerEfternavn'} , {name: 'Med Brugernavn'}, {name: 'Med Email'} , {name: 'Med events Titel'}]},
    {name: 'Rolle', children:[ {name: 'Med Rollenavn'} , {name: 'Rolle Med Brugernavn'}]},
    {name: 'Bryggeri',children:[{name: 'Med BryggeriSamarbejde'} , {name: 'Med Bryggerinavn'}]},
    {name: 'Øl',children:[{name: 'Med ØlId'} , {name: 'Med Ølnavn'} , {name: 'Med Øltype'}]} ,
    {name: 'Events', children:[ {name: 'Med Eventstitel'} , {name: 'Med Deltagelser'} ]} ,
    {name: 'Forum', children:[{name: 'Med ForumId'} , {name: 'Med ForumTitel'}]} ,
    {name: 'Tags', children:[{name: 'admin-tags'} , {name: 'admin-opret-tag'} , {name: 'admin-rediger-tag'}]} ,
    {name: 'Certifikant'}],
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
  showBrugerIdComponent:boolean=false;
  showCetifikantComponent: boolean=false;
  showOlComponent:boolean=false;
  showEventsComponent:boolean=false;
  showAdminTagsComponent:boolean=false;
  showAdminRedigerTagsComponent:boolean=false;
  showAdminOpretTagsComponent:boolean=false;
  showBryggeriComponent:boolean=false;
  showRolleComponent:boolean=false;
  showForumComponent:boolean=false;
  showBrugernavnComponent:boolean=false;
  showBrugerEmailComponent:boolean=false;

  constructor(  public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) {  this.dataSource.data = TREE_DATA;}

  hasChild = (_: number, node: Search) => !!node.children && node.children.length > 0;

  ngOnInit(): void {

  }

  showComponent(nodeName : string){
  console.log(nodeName);
  switch (nodeName)
  {
    case 'Med Brugernavn':{
      this.showBrugernavnComponent=!this.showBrugernavnComponent;
      break;
    }
    case 'Med BrugerEfternavn':{
      this.showBrugernavnComponent=!this.showBrugernavnComponent;
      break;
    }
    case 'Med Email':{
      this.showBrugernavnComponent=!this.showBrugernavnComponent;
      break;
    }
    case 'Med events Titel':{
      this.showBrugernavnComponent=!this.showBrugernavnComponent;
      break;
    }
    case 'Med Ølnavn':{
      this.showOlComponent=!this.showOlComponent;
      break;
    }
    case 'Med Eventstitel':{
      this.showEventsComponent=!this.showEventsComponent;
      break;
    }
    case 'Med Deltagelser':{
      this.showEventsComponent=!this.showEventsComponent;
      break;
    }
    case 'admin-tags':{
      this.showAdminTagsComponent=!this.showAdminTagsComponent;
      break;
    }
    case 'admin-opret-tag':{
      this.showAdminOpretTagsComponent=!this.showAdminOpretTagsComponent;
      break;
    }
    case 'admin-rediger-tag':{
      this.showAdminRedigerTagsComponent=!this.showAdminRedigerTagsComponent;
      break;
    }
    case 'Certifikant':{
      this.showCetifikantComponent=!this.showCetifikantComponent;
      break;
    }
    case 'Med Bryggerinavn':{
      this.showBryggeriComponent=!this.showBryggeriComponent;
      break;
    }
    case 'Med BryggeriSamarbejde':{
      this.showBryggeriComponent=!this.showBryggeriComponent;
      break;
    }
    case 'Med ForumTitel':{
      this.showForumComponent=!this.showForumComponent;
      break;
    }
    case 'Med Rollenavn':{
      this.showRolleComponent=!this.showRolleComponent;
      break;
    }
    case 'Rolle Med Brugernavn':{
      this.showRolleComponent=!this.showRolleComponent;
      break;
    }
  }
  }
}
