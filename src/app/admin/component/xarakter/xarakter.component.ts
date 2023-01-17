import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { XarakterService } from 'src/app/service/xarakter.service';

@Component({
  selector: 'app-xarakter',
  templateUrl: './xarakter.component.html',
  styleUrls: ['./xarakter.component.scss']
})
export class XarakterComponent implements OnInit {

  xarakterlar: any[]=[];
  tahrirRejim=false;
  xarakterForm!: FormGroup;
  surovBajarilmoqda=false;
  formOchiq= false;

  displayedColumns: string[] = ['id', 'nom', 'info', 'amal'];
  dataSource: any;
  filter = new FormControl('filter')

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
     private xarakterService: XarakterService,
     private snakBar: MatSnackBar
     ) { }
     ngAfterViewInit(): void {
  
      this.load();
    }

  ngOnInit(): void {
    this.xarakterForm=this.fb.group({
      id:[''],
      nom:['',Validators.required],
      info:['']
    });
    this.xarakterService.getAll('').subscribe(data => {
      this.xarakterlar = data.content;
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
    this.xarakterService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {
  
      console.log(royxat);
      this.xarakterlar = royxat.content;
  
      this.length = royxat.totalElements;
    });
  }
  
  saqlash() {
    this.surovBajarilmoqda = true;
    let xarakter = this.xarakterForm.getRawValue();
    // yutuq.lavozim = {
    //   id: yutuq.lavozim
    // }
    let surov;
    if (this.tahrirRejim)
      surov = this.xarakterService.update(xarakter);
    else
      surov = this.xarakterService.create(xarakter);


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
ochirish(xarakter: any) {
       if (confirm("Siz " + xarakter.nom + "ni o'chirishga rozimisiz")) {
         this.xarakterService.deleteById(xarakter.id).subscribe(data => {
          this.load();
         })
       }
}

tahrirlash(xarakter: any) {
  this.tahrirRejim = true;
  this.xarakterForm.reset(xarakter);
  this.formOchiq = true;
}

tozalash() {
  this.xarakterForm.reset({});
  this.tahrirRejim = false;
  this.formOchiq = false;
}

}
