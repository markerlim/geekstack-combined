import { CommonModule, Location } from '@angular/common';
import { Component, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DetailstackComponent } from '../detailstack/detailstack.component';
import { Userpost } from '../../../../core/model/userpost.model';
import { GSSqlUser } from '../../../../core/model/sql-user.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { GeekstackService } from '../../../../core/service/geekstackdata.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-singlestack',
    standalone: true,
    imports: [CommonModule, MatIconModule, DetailstackComponent],
    templateUrl: './singlestack.component.html',
    styleUrl: './singlestack.component.css'
})
export class SinglestackComponent {

  isLiked: boolean = false;
  isDetailStackOpen: boolean = false;
  isSlideReady: boolean = false;
  imageSrc?: string = '';
  useFallBack: boolean = false;

  @Input() post!: Userpost;

  @Input() user!: GSSqlUser;

  @Output() removeDeck = new Subject<string>;

  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private geekstackService = inject(GeekstackService);
  constructor(){}

  ngOnInit() {
    this.imageSrc = this.post.selectedCards.at(0)?.imageSrc;
    this.isLiked = this.post.listoflikes?.includes(this.user.userId) ?? false;

    this.route.paramMap.subscribe(params => {
      const postId = params.get('postId');
      if (postId && this.post.postId === postId) {
        this.onClickPost(postId);
      }
    });
  }

  likePost(event: Event) {
    event.stopPropagation();
    this.isLiked = !this.isLiked;
  }

  onLikingPost(bool:boolean){
    this.isLiked = bool;
  }

  onClickPost(postId:string) {
    this.location.replaceState(`/stacks/${postId}`);
    this.isDetailStackOpen = true;
    setTimeout(()=>{
      this.isSlideReady = true;
    },50)
  }

  onImageError(){
    this.useFallBack= true;
  }

  onClosePost() {
    this.location.replaceState(`/stacks`);
    this.isSlideReady = false;
    setTimeout(()=>{
      this.isDetailStackOpen = false;
    },500)
  }
  onOpenDeleteDialog(event:any){
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteModalComponent,{width:'300px',
      data: { message: 'Are you sure you want to delete this item?' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.geekstackService.deletePostByUser(this.post.postId).subscribe({
          next:(res) =>{
            console.log(res)
            this.removeDeck.next(this.post.postId);
          },
          error: (err)=>{
            console.error(err)
          }
        });
      } else {
        console.log('User canceled the delete');
        // Handle the cancellation logic
      }
    });
  }

  
}
