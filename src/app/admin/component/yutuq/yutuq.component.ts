import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { YutuqService } from 'src/app/service/yutuq.service';

@Component({
  selector: 'app-yutuq',
  templateUrl: './yutuq.component.html',
  styleUrls: ['./yutuq.component.scss']
})
export class YutuqComponent implements OnInit {
  yutuqlar: any[]=[];
  tahrirRejim=false;
  yutuqForm!: FormGroup;
  surovBajarilmoqda=false;
  formOchiq= false;

  displayedColumns: string[] = ['id', 'nom', 'info', 'amal'];
  dataSource: any;
  filter = new FormControl('filter')

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
     private yutuqService: YutuqService,
     private snakBar: MatSnackBar
     ) { }
     ngAfterViewInit(): void {
  
      this.load();
    }

  ngOnInit(): void {
    this.yutuqForm=this.fb.group({
      id:[''],
      nom:['',Validators.required],
      info:['']
    });
    this.yutuqService.getAll('').subscribe(data => {
      this.yutuqlar = data.content;
    })
  }

  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
      console.log(key);
  
  
    }
    this.yutuqService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {
  
      console.log(royxat);
      this.yutuqlar = royxat.content;
  
      this.length = royxat.totalElements;
    });
  }
  
  saqlash() {
    this.surovBajarilmoqda = true;
    let yutuq = this.yutuqForm.getRawValue();
    // yutuq.lavozim = {
    //   id: yutuq.lavozim
    // }
    let surov;
    if (this.tahrirRejim)
      surov = this.yutuqService.update(yutuq);
    else
      surov = this.yutuqService.create(yutuq);


    surov.subscribe(data => {
      this.tozalash();
      this.load();
      this.surovBajarilmoqda = false;
    },
      error => {
        this.snakBar.open("Xatolik ro'y berdi", "Ok");
        this.surovBajarilmoqda = false;
      })
}
ochirish(yutuq: any) {
       if (confirm("Siz " + yutuq.nom + "ni o'chirishga rozimisiz")) {
         this.yutuqService.deleteById(yutuq.id).subscribe(data => {
          this.load();
         })
       }
}

tahrirlash(yutuq: any) {
  this.tahrirRejim = true;
  this.yutuqForm.reset(yutuq);
  this.formOchiq = true;
}

tozalash() {
  this.yutuqForm.reset({});
  this.tahrirRejim = false;
  this.formOchiq = false;
}
}
