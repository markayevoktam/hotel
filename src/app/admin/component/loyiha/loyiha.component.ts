import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { LoyihaService } from 'src/app/service/loyiha.service';

@Component({
  selector: 'app-loyiha',
  templateUrl: './loyiha.component.html',
  styleUrls: ['./loyiha.component.scss']
})
export class LoyihaComponent implements OnInit {

  loyihalar: any[] = [];
  tahrirRejim = false;
  loyihaForm!: FormGroup;
  surovBajarilmoqda = false;
  formOchiq = false;

  displayedColumns: string[] = ['id', 'nom', 'info', 'amal'];
  dataSource: any;
  filter = new FormControl('filter')

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
    private loyihaService: LoyihaService,
    private snakBar: MatSnackBar
  ) { }
  ngAfterViewInit(): void {

    this.load();
  }

  ngOnInit(): void {
    this.loyihaForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      info: ['']
    });
   
    this.loyihaService.getAll('').subscribe(data => {
      this.loyihalar = data.content;
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
    this.loyihaService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {

      console.log(royxat);
      this.loyihalar = royxat.content;

      this.length = royxat.totalElements;
    });
  }

  saqlash() {
    this.surovBajarilmoqda = true;
    let loyiha = this.loyihaForm.getRawValue();

    let surov;
    if (this.tahrirRejim)
      surov = this.loyihaService.update(loyiha);
    else
      surov = this.loyihaService.create(loyiha);


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
  ochirish(loyiha: any) {
    if (confirm("Siz " + loyiha.nom + "ni o'chirishga rozimisiz")) {
      this.loyihaService.deleteById(loyiha.id).subscribe(data => {
        this.load();
      })
    }
  }

  tahrirlash(loyiha: any) {
    this.tahrirRejim = true;
    this.loyihaForm.reset(loyiha);
    this.formOchiq = true;
  }

  tozalash() {
    this.loyihaForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }
}
