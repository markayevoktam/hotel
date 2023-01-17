import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { FakultetService } from 'src/app/service/fakultet.service';

@Component({
  selector: 'app-fakultet',
  templateUrl: './fakultet.component.html',
  styleUrls: ['./fakultet.component.scss']
})
export class FakultetComponent implements OnInit {
  fakultetForm!: FormGroup;
  fakultetlar: any[] = [];
  tahrirRejim = false;
  formOchiq = false;
  
  surovBajarilmoqda = false;
  
  displayedColumns: string[] = ['id', 'nom', 'info', 'amal'];
  dataSource: any;
  filter = new FormControl('filter')
  
  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private fb: FormBuilder,
    private fakultetService: FakultetService,
    private snakBar: MatSnackBar) { }
  ngAfterViewInit(): void {
  
    this.load();
  }
  
  ngOnInit(): void {
  
  
    this.fakultetForm = this.fb.group({
      id: [],
      nom: ['', Validators.required],
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
    this.fakultetService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {
  
      console.log(royxat);
      this.fakultetlar = royxat.content;
  
      this.length = royxat.totalElements;
    });
  }
  
  saqlash() {
      this.surovBajarilmoqda = true;
      let fakultet = this.fakultetForm.getRawValue();
      fakultet.lavozim = {
        id: fakultet.lavozim
      }
      let surov;
      if (this.tahrirRejim)
        surov = this.fakultetService.update(fakultet);
      else
        surov = this.fakultetService.create(fakultet);
  
  
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
  ochirish(fakultet: any) {
         if (confirm("Siz " + fakultet.nom + "ni o'chirishga rozimisiz")) {
           this.fakultetService.deleteById(fakultet.id).subscribe(data => {
            this.load();
           })
         }
  }
  
  tahrirlash(fakultet: any) {
    this.tahrirRejim = true;
    this.fakultetForm.reset(fakultet);
    this.formOchiq = true;
  }
  
  tozalash() {
    this.fakultetForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }
}
