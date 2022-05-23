import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Forum } from 'src/app/Models/Forum';
import { Rolle } from 'src/app/Models/Rolle';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { UpdateForumDialogBoxComponent } from '../update-forum-dialog-box/update-forum-dialog-box.component';
import { UpdatePostDialogBoxComponent } from '../update-post-dialog-box/update-post-dialog-box.component';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css']
})

export class ForsideComponent implements OnInit {
  @Input() postOprettelse = { titel: '', indhold: '', brugerId: 0, forumId: 0 };
  @Input() postSvar = { titel: '', indhold: '', brugerId: 0, forumId: 0, postId: 0 };
  dialogRefOpdaterPost: MatDialogRef<UpdatePostDialogBoxComponent>;
  dialogRefOpdaterForum: MatDialogRef<UpdateForumDialogBoxComponent>;
  opretForm: any = new FormGroup({});
  svarForm: any = new FormGroup({});
  forums: any;
  forum: Forum[];
  posts: any;
  postsId: any;
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
  opdaterForum: any;
  id = this.actRoute.snapshot.params['id'];
  clickButton: boolean = true;
  clickBtnSvar = false;
  egenBrugerId: boolean;
  egenPostId: boolean;
  egenForumId: boolean;
  rolleListe: Rolle[];
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
    });
    this.svarForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      indhold: new FormControl('', Validators.required),
      brugerId: new FormControl('', Validators.required),
      forumId: new FormControl('', Validators.required),
      postid: new FormControl('', Validators.required)
    });
    this.onHentForum();
    this.onHentPost();
    this.onHentRolle();
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
    })
  }

  onHentRolle(){
    this.restApi.getDatas(this.endpointR).subscribe(rolle =>{ 
      this.rolleListe = rolle
      this.rolle = this.rolleListe.find((a:any) => a.level === 300)
    })
  }

  onGodkendPost(id: any) {
    this.postOprettelse.forumId = id;
    this.postOprettelse.brugerId = this.brugerId;
    this.restApi.createData(this.postOprettelse, this.endpointP).subscribe((data) => {
      this.postOprettelse.indhold = '';
      this.postOprettelse.titel = '';
      this.ngOnInit();
    });
  }

  onSvarToggle() {
    this.clickBtnSvar = !this.clickBtnSvar;
  }

  onSvarPost(forumId: any, postId: any) {
    this.postSvar.forumId = forumId;
    this.postSvar.brugerId = this.brugerId;
    this.postSvar.postId = postId;
    this.restApi.createData(this.postSvar, this.endpointP).subscribe((data) => {
      this.postSvar.indhold = '';
      this.postSvar.titel = '';
      this.ngOnInit();
    });
  }

  onVisPost(id: any) {
    this.clickButton = false;
    // this.brugerId2=JSON.parse(localStorage.getItem('brugerId2') || '{}');
    // this.listPosts= this.posts.filter((res:any) => res.forumId === id && (res.brugerId2 === this.brugerId2 || res.brugerId1 === this.brugerId1))
    this.posts = this.postListe.filter((res: any) => res.forumId === id);
  }

  onSletForum(id: any) {
    this.restApi.getData(id, this.endpointF).subscribe(data => {
      if (this.brugerId === data.brugerId  || this.rolle ===300) {
        let dialogRef = this.dialog.open(SletDialogBoxComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result == true) {
            this.restApi.deleteData(id, this.endpointF).subscribe(data => {
              this.ngOnInit();
            })
          }
        });
      } 
      else {
        alert('Du kan ikke slette denne besked, det er fordi det ikke din!')
      }
    })
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
            this.opdaterForum = result;
            this.restApi.updateData(id, this.endpointP, this.opdaterPost).subscribe((data) => {
              this.ngOnInit();
            })
          }
        })
      }
      else {
        alert('Du kan ikke update denne besked, det er fordi det ikke din!')
      }
    })
  }

  onOpdaterForum(id: any) {
    this.restApi.getData(id, this.endpointF).subscribe(data => {
      if (this.brugerId === data.brugerId || this.rolle ===300) {
        localStorage.setItem('forumId', JSON.stringify(id));
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "40%";
        dialogConfig.height = 'auto';
        this.dialogRefOpdaterForum = this.dialog.open(UpdateForumDialogBoxComponent, dialogConfig);
        this.dialogRefOpdaterForum.afterClosed().subscribe(result => {
          if (result) {
            this.opdaterForum = result;
            this.restApi.updateData(id, this.endpointF, this.opdaterForum).subscribe((data) => {
              this.ngOnInit();
            })
          }
        })
      }
      else {
        alert('Du kan ikke update denne besked, det er fordi det ikke din!')
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
      } 
      else {
        alert('Du kan ikke slette denne besked, det er fordi det ikke din!')
      }
    })
  }
}