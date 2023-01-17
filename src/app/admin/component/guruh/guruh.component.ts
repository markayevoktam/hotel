import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { GuruhService } from 'src/app/service/guruh.service';
import { YunalishService } from 'src/app/service/yunalish.service';

@Component({
  selector: 'app-guruh',
  templateUrl: './guruh.component.html',
  styleUrls: ['./guruh.component.scss']
})
export class GuruhComponent implements OnInit {

  guruhForm!: FormGroup;

  guruhlar: any[] = [];
    tahrirRejim = false;
    formOchiq = false;
    yunalishlar: any; 
    surovBajarilmoqda = false;
    
    displayedColumns: string[] = ['id', 'nom', 'yunalish', 'info','amal'];
    dataSource: any;
    filter = new FormControl('filter')
    
    length = 100;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    
    constructor(private fb: FormBuilder,
      private yunalishService: YunalishService,
      private guruhService:GuruhService,
      private snakBar: MatSnackBar) { }
    ngAfterViewInit(): void {
  
      this.load();
    }
    
    ngOnInit(): void {
    
    
      this.guruhForm = this.fb.group({
        id: [],
        nom: ['', Validators.required],
        yunalish: [''],
        info: ['']
      });
    
      this.yunalishService.getAll('').subscribe(data => {
        this.yunalishlar = data.content;
      })

      
    }
    
    load(key?: any) {
      if (!key) {
        key = '';
      } else {
        if (typeof (key) == 'object') {
          key = key.value;
        }
    
    
      }
      this.guruhService.getAll({
        key: key,
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: 'id'
      }).subscribe(royxat => {
    
        console.log(royxat);
        this.guruhlar = royxat.content;
        console.log(royxat.size)
        console.log(royxat.content);
        
        this.length = royxat.totalElements;
      });
    }
    
    saqlash() {
        this.surovBajarilmoqda = true;
        let guruh = this.guruhForm.getRawValue();
        guruh.yunalish = {
          id: guruh.yunalish
        }
        let surov;
        if (this.tahrirRejim)
          surov = this.guruhService.update(guruh);
        else
          surov = this.guruhService.create(guruh);
    
    
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

    ochirish(guruh: any) {
           if (confirm("Siz " + guruh.nom + "ni o'chirishga rozimisiz")) {
             this.guruhService.deleteById(guruh.id).subscribe(data => {
              this.load();
             })
           }
    }
    
    tahrirlash(guruh: any) {
      this.tahrirRejim = true;
      this.guruhForm.reset(guruh);
      this.formOchiq = true;
    }
    
    tozalash() {
      this.guruhForm.reset({});
      this.tahrirRejim = false;
      this.formOchiq = false;
    }
    

}
