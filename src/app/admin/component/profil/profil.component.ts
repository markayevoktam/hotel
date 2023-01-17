import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/account.service';
import { User } from 'src/app/model/user';
import { FaylService } from 'src/app/service/fayl.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user!:User;
  rasmManzil="";
  constructor(private accountService:AccountService,
    private faylService:FaylService
    ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(data=>{
      this.user=data;
    })
  }

  onFileSelected(event: any){
    const file:File = event.target.files[0];
    if(file){
      this.faylService.uploadFayl(file).subscribe(f=>{
        this.user.rasm=f;
        this.accountService.update(this.user).subscribe(data=>{
          this.user=data;
        });
      })
    }

  }

  
}
