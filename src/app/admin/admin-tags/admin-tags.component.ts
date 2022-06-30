import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Tags } from 'src/app/Models/Tags';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { OpdaterTagDialogBoxComponent } from '../opdater-tag-dialog-box/opdater-tag-dialog-box.component';
import { OpretTagDialogBoxComponent } from '../opret-tag-dialog-box/opret-tag-dialog-box.component';

@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.css']
})
export class AdminTagsComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpretTags: MatDialogRef<OpretTagDialogBoxComponent>;
  dialogRefOpdaterTags: MatDialogRef<OpdaterTagDialogBoxComponent>;
  clickButton: boolean = true;
  searchkeyTag: string;
  tagListe: any;
  tags: Tags[];
  endpointT = '/Tags';

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onHentTags()
  }

  onHentTags() {
    return this.restApi.getDatas(this.endpointT).subscribe((tag) => {
      this.tags = tag;
    });
  }

  onVisTags(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointT).subscribe(data => {
      this.tagListe = data;
    })
  }

  onOpretTags() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.height = '20%';
    this.dialogRefOpretTags = this.dialog.open(OpretTagDialogBoxComponent, dialogConfig);
    this.dialogRefOpretTags.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  onOpdaterTags(id:any) {
    localStorage.setItem('tagId', JSON.stringify(id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = 'auto';
    this.dialogRefOpdaterTags = this.dialog.open(OpdaterTagDialogBoxComponent, dialogConfig);
    this.dialogRefOpdaterTags.afterClosed().subscribe(result => {
      if (result) {
        this.tagListe = result;
        this.restApi.updateData(id, this.endpointT, this.tagListe).subscribe((data) => {
          this.ngOnInit();
        })
      }
    })
  }

  onSletTags(id:any) {
    if (this.tagListe.length !== 0) {
      alert('Der er et problem');
    }
    else {
      let dialogRef = this.dialog.open(SletDialogBoxComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.restApi.deleteData(id, this.endpointT).subscribe((data) => {
            this.ngOnInit();
          })
        }
      });
    }
  }

  onFindTag(){
    if(this.searchkeyTag == ""){
      this.ngOnInit();
    }
    else{
      this.tags = this.tags.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkeyTag.toLowerCase());
      })
    }
  }
}