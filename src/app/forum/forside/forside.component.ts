import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Forum } from 'src/app/Models/Forum';
import { Post } from 'src/app/Models/Post';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { UpdatePostDialogBoxComponent } from '../update-post-dialog-box/update-post-dialog-box.component';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css']
})

export class ForsideComponent implements OnInit {
  @Input() postCreation = {titel: '', indhold: '' , brugerId:0 ,forumId:0  };
  dialogRefUpdatePost : MatDialogRef<UpdatePostDialogBoxComponent>;

  creationForm : any = new FormGroup({});

  forums: Forum[];
  forum = new Forum;
  posts: Post[];
  listUser:any;
  endpointF = '/Forumer';
  endpointP = '/Posts';
  endpointU = '/Brugere';
  searchkey: string;
  showForum = false;
  userId:number;
  postInfo:any;
  listPosts:any;
  updatePost:any;
  id = this.actRoute.snapshot.params['id'];
  clickButton:boolean=true;
  listArrayUserId = new Array();

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.userId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.creationForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      indhold: new FormControl('', Validators.required),
      brugerId:new FormControl('' , Validators.required),
      forumId:new FormControl('' , Validators.required)
      //oprettet:new FormControl('', Validators.required)

    });
    this.onloadForum();
    this.onloadPost();
    //this.loadBruger();
  }

  onloadForum(){
    return this.restApi.getDatas(this.endpointF).subscribe((forum) => {
      this.forums = forum;
      console.log('forum:', this.forums)
    })
  }

  onloadPost(){
    return this.restApi.getDatas(this.endpointP).subscribe((post) => {
      this.posts = post;
      console.log('posts:',this.posts);
    })
  }

/*   loadBruger(){
    return this.restApi.getData(this.brugerId,this.endpointb).subscribe(data => {
      this.listBruger = data;
      console.log('brugernavn:', this.listBruger.brugernavn)
       for (let i = 0 ; i< this.listBruger.length ; i++){
        this.listArrayBrugerId.push(this.listBruger[i].id)
      }

     } )
  } */

  onApprovePost(id:any){
    this.postCreation.brugerId= this.userId;
    this.postCreation.forumId=id;
    // this.postOprettelse.oprettet=formatDate(new Date(), 'yyyy-MM-ddThh:mm:ssssZ' , 'en-US').toString();
/*      if(!this.listArrayBrugerId.includes(Number(this.postOprettelse.brugerId2)))
    {
      alert('du har valgt bruger som ikke eksister!')
    }else{ */

     this.restApi.createData(this.postCreation, this.endpointP).subscribe((data) => {
     this.postCreation.indhold='';
     this.postCreation.titel='';


        // localStorage.setItem('brugerId2' ,JSON.stringify(data.brugerId2) );
       // this.router.navigate(['../main/katalog']);
      });
    //}
  }

  onShowPost(id:any){
    this.clickButton=false;
    // this.brugerId2=JSON.parse(localStorage.getItem('brugerId2') || '{}');
    // this.listPosts= this.posts.filter((res:any) => res.forumId === id && (res.brugerId2 === this.brugerId2 || res.brugerId1 === this.brugerId1 ))
     this.listPosts= this.posts.filter((res:any) => res.forumId === id )
    //  console.log('this.postOprettelse.brugerId1:', this.brugerId)
    // console.log('this.postOprettelse.brugerId2:', res.brugerId1)
    // console.log('this.listPosts:', this.listPosts)
  }

  onFindForum(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.forums = this.forums.filter(res =>{
        return res.titel.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onUpdatePost(id:any){

    this.restApi.getData(id , this.endpointP).subscribe(data => {
    if(this.userId === data.brugerId){

      localStorage.setItem('postId' ,JSON.stringify(id));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      dialogConfig.height= 'auto';
      this.dialogRefUpdatePost = this.dialog.open(UpdatePostDialogBoxComponent , dialogConfig);
      this.dialogRefUpdatePost.afterClosed().subscribe(result => {
        if(result){
          this.updatePost = result;
          this.restApi.updateData(id, this.endpointP, this.updatePost).subscribe((data) => {
            //console.log(this.eventList);
            this.ngOnInit();
          })
        }
      })
    }
    else{
      alert('du kan ikke update denne besked , det er fordi det ikke din!')
    }
  })
  }

  onCreateForum() {
    this.router.navigate(['../forum/forumcreation']);
  };


  onDeletePost(id: any) {
    this.restApi.getData(id , this.endpointP).subscribe(data => {
      if(this.userId === data.brugerId){
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpointP).subscribe(data => {
        this.ngOnInit();
      })
    });
    }else{
      alert('du kan ikke slette denne besked , det er fordi det ikke din!')
    }
  })
  }
}