import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Forum } from 'src/app/Models/Forum';
import { Rolle } from 'src/app/Models/Rolle';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { UpdatePostDialogBoxComponent } from '../update-post-dialog-box/update-post-dialog-box.component';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css']
})

export class ForsideComponent implements OnInit {
  @Input() postOprettelse = { titel: '', indhold: '', brugerId: 0, forumId: 0 };
  dialogRefOpdaterPost: MatDialogRef<UpdatePostDialogBoxComponent>;

  opretForm: any = new FormGroup({});

  forums: any;
  forum: Forum;
  posts: any;
  brugerListe: any;
  postListe: any
  endpointF = '/Forumer';
  endpointP = '/Posts';
  endpointB = '/Bruger';
  endpointR = '/Rolle';
  searchkey: string;
  showForum = false;
  brugerId: number;
  postInfo: any;
  opdaterPost: any;
  id = this.actRoute.snapshot.params['id'];
  clickButton: boolean = true;
  clickButtonSvar: boolean = true;
  rolleListe: Rolle [];
  rolle: any;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.opretForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      indhold: new FormControl('', Validators.required),
      brugerId: new FormControl('', Validators.required),
      forumId: new FormControl('', Validators.required),
      //oprettet:new FormControl('', Validators.required)
    });
    this.onHentForum();
    this.onHentPost();
    this.onHentRolle();
    //this.loadBruger();
  }

  onHentForum() {
    return this.restApi.getDatas(this.endpointF).subscribe((forum) => {
      this.forums = forum;
    })
  }

  onHentPost() {
    return this.restApi.getDatas(this.endpointP).subscribe((post) => {
      this.postListe = post;
      // this.postListe = this.postListe.filter((res: any) => res.forumId = this.forums.id);
       console.log('bruger:',this.postListe);
    })
  }

  onHentRolle(){
    this.restApi.getDatas(this.endpointR).subscribe(rolle =>{ 
      this.rolleListe = rolle
      this.rolle = this.rolleListe.find((a:any) => a.level === 300)
      console.log('roll;' , this.rolle)})
  }

  onGodkendPost(id: any) {
    this.postOprettelse.brugerId = this.brugerId;
    this.postOprettelse.forumId = id;
    this.restApi.createData(this.postOprettelse, this.endpointP).subscribe((data) => {
      this.postOprettelse.indhold = '';
      this.postOprettelse.titel = '';
      this.ngOnInit();
    });
  }

  onVisPost(id: any) {
    this.clickButton = false;
    // this.brugerId2=JSON.parse(localStorage.getItem('brugerId2') || '{}');
    // this.listPosts= this.posts.filter((res:any) => res.forumId === id && (res.brugerId2 === this.brugerId2 || res.brugerId1 === this.brugerId1 ))
    this.posts = this.postListe.filter((res: any) => res.forumId === id);
    console.log(this.postListe);
  }

  onFindForum() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.forums = this.forums.filter((res: any) => {
        return res.titel.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onOpdaterPost(id: any) {
    this.restApi.getData(id, this.endpointP).subscribe(data => {
      if (this.brugerId === data.brugerId || this.rolle ===300) {
        localStorage.setItem('postId', JSON.stringify(id));
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "40%";
        dialogConfig.height = 'auto';
        this.dialogRefOpdaterPost = this.dialog.open(UpdatePostDialogBoxComponent, dialogConfig);
        this.dialogRefOpdaterPost.afterClosed().subscribe(result => {
          if (result) {
            this.opdaterPost = result;
            this.restApi.updateData(id, this.endpointP, this.opdaterPost).subscribe((data) => {
              this.ngOnInit();
            })
          }
        })
      }
      else {
        alert('du kan ikke update denne besked , det er fordi det ikke din!')
      }
    })
  }

  onOpretForum() {
    this.router.navigate(['../forum/opret-forum']);
  };

  onSletPost(id: any) {
    this.restApi.getData(id, this.endpointP).subscribe(data => {
      if (this.brugerId === data.brugerId  || this.rolle ===300) {
        let dialogRef = this.dialog.open(SletDialogBoxComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result == true) {
            this.restApi.deleteData(id, this.endpointP).subscribe(data => {
              this.ngOnInit();
            })
          }
        });
      } else {
        alert('du kan ikke slette denne besked , det er fordi det ikke din!')
      }
    })
  }
}