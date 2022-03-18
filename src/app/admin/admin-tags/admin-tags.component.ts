import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/delete-dialog-box/slet-dialog-box.component';
import { Tags } from 'src/app/Models/Tags';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { OpretTagsDialogBoxComponent } from '../creation-tags-dialog-box/opret-tags-dialog-box.component';
import { UpdateTagsDialogBoxComponent } from '../update-tags-dialog-box/update-tags-dialog-box.component';

@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.css']
})
export class AdminTagsComponent implements OnInit {
  tagslists: Tags[];
  endpointT = '/Tags';
  searchkey: string;
  tagList: any ;
  dialogRefUpdateTags: MatDialogRef<UpdateTagsDialogBoxComponent>;
  dialogRefCreateTags: MatDialogRef<OpretTagsDialogBoxComponent>;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onloadTags()
  }

  onloadTags() {
    return this.restApi.getDatas(this.endpointT).subscribe((tag) => {
      this.tagslists = tag;
    });
  }

  onCreateTags() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefCreateTags = this.dialog.open(OpretTagsDialogBoxComponent, dialogConfig);
    this.dialogRefCreateTags.afterClosed().subscribe(result => {
      if (result) {
        this.tagList = result;
        this.restApi.createData(this.tagList, this.endpointT).subscribe((data) => {
          console.log(this.tagList);
          this.onloadTags();
        })
      }
    });
  }

  onUpdateTags(id:any) {
    localStorage.setItem('tagsId' ,JSON.stringify(id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefUpdateTags = this.dialog.open(UpdateTagsDialogBoxComponent, dialogConfig);
    this.dialogRefUpdateTags.afterClosed().subscribe(result => {
      if (result) {
        this.tagList = result;
        this.restApi.updateData(id, this.endpointT, this.tagslists).subscribe((data) => {
          console.log(data);
          this.onloadTags();
        })
      }
    });
  }

  onDeleteTags(id:any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true) {
        this.restApi.deleteData(id, this.endpointT).subscribe(data => {
          this.onloadTags();
        })
      }
    });
  }
  
  onFindTags(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.tagslists = this.tagslists.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }
}
