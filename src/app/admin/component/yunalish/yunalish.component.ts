import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { FakultetService } from 'src/app/service/fakultet.service';
import { YunalishService } from 'src/app/service/yunalish.service';

@Component({
  selector: 'app-yunalish',
  templateUrl: './yunalish.component.html',
  styleUrls: ['./yunalish.component.scss']
})
export class YunalishComponent implements OnInit {

  yunalishForm!: FormGroup;

  yunalishlar: any[] = [];
    tahrirRejim = false;
    formOchiq = false;
    fakultetlar: any; 
    surovBajarilmoqda = false;
    
    displayedColumns: string[] = ['id', 'nom', 'fakultet', 'info','amal'];
    dataSource: any;
    filter = new FormControl('filter')
    
    length = 100;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    
    constructor(private fb: FormBuilder,
      private yunalishService: YunalishService,
      private fakultetService:FakultetService,
      private snakBar: MatSnackBar) { }
    ngAfterViewInit(): void {
  
      this.load();
    }
    
    ngOnInit(): void {
    
    
      this.yunalishForm = this.fb.group({
        id: [],
        nom: ['', Validators.required],
        fakultet: ['', Validators.required],
        info: ['']
      });
    
      this.fakultetService.getAll('').subscribe(data => {
        this.fakultetlar = data.content;
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
      this.yunalishService.getAll({
        key: key,
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: 'id'
      }).subscribe(royxat => {
    
        console.log(royxat);
        this.yunalishlar = royxat.content;
    
        this.length = royxat.totalElements;
      });
    }
    
    saqlash() {
        this.surovBajarilmoqda = true;
        let yunalish = this.yunalishForm.getRawValue();
        yunalish.fakultet = {
          id: yunalish.fakultet
        }
        let surov;
        if (this.tahrirRejim)
          surov = this.yunalishService.update(yunalish);
        else
          surov = this.yunalishService.create(yunalish);
    
    
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
    ochirish(yunalish: any) {
           if (confirm("Siz " + yunalish.nom + "ni o'chirishga rozimisiz")) {
             this.yunalishService.deleteById(yunalish.id).subscribe(data => {
              this.load();
             })
           }
    }
    
    tahrirlash(yunalish: any) {
      this.tahrirRejim = true;
      this.yunalishForm.reset(yunalish);
      this.formOchiq = true;
    }
    
    tozalash() {
      this.yunalishForm.reset({});
      this.tahrirRejim = false;
      this.formOchiq = false;
    }
}
