import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private accountService: AccountService){}
  ngOnInit(): void {
    this.accountService.identity().subscribe(data=>{
      // console.log(data);
      
    })
  }

  
}
