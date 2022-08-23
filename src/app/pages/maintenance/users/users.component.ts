import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from '../../../models/user.model';

import { UserService } from '../../../services/user.service';
import { SearchService } from '../../../services/search.service';
import {ModalImageService} from 'src/app/services/modal-image.service';
import {delay, Subscription} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers:number = 0;
  public users:User[]=[];
  public usersTemp:User[]=[];

  public imgSub!: Subscription;
  public desde: number = 0;
  public loading: boolean = true;

  constructor( 
              private userService: UserService, 
              private searchService:SearchService,
              private modalService:ModalImageService
             ) { }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe()
  }

  ngOnInit(): void {
  
    this.loadUsers();
    
    this.imgSub = this.modalService.newImage.pipe(delay(100)).subscribe(imb=>{ 
      this.loadUsers()
    });
  
  }

  loadUsers (){
    
    this.loading = true;

    this.userService.loadUsers(this.desde).subscribe(({users, total})=>{
      this.totalUsers = total;
      this.users = users;      
      this.usersTemp = users;      
      this.loading = false;
    })
  
  }

  changePage(value:number){
    
    this.desde += value;
    
    if(this.desde < 0){
      this.desde = 0;
    } else if(this.desde > this.totalUsers){
      this.desde -= value;
    }
    
    this.loadUsers();
  
  }

  search(term:string){

    if(term.length == 0){
      return this.users = this.usersTemp;
    }

    return this.searchService.search('users', term).subscribe(resp => {
      this.users = resp;
    })

  }

  deleteUser(user:User){

    if(user.uid === this.userService.uid){
      return Swal.fire('Error', `You can't erase yourself, error`);
    }

    return Swal.fire({
      title: `Are you sure to delete ${user.name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
    
        if (result.isConfirmed) {
          
          this.userService.deleteUser(user.uid).subscribe(resp=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success')
            this.loadUsers()
          });
        
        }
      })

  }

  changeRole(user:User){
  
    this.userService.saveUser(user).subscribe(resp=>{
      Swal.fire('Updated', `Role of user ${user.name} updated`, 'success')
    })
  
  }

  openModal(user:User){
    this.modalService.openModal('users', user.uid!, user.img)
  }




}
