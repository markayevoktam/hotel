import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AccountService } from 'src/app/core/account.service';
import { User } from 'src/app/model/user';
import { FaylService } from 'src/app/service/fayl.service';
import { GuruhService } from 'src/app/service/guruh.service';
import { LoyihaService } from 'src/app/service/loyiha.service';
import { TalabaService } from 'src/app/service/talaba.service';
import { XarakterService } from 'src/app/service/xarakter.service';
import { environment } from 'src/environments/environment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { YutuqService } from 'src/app/service/yutuq.service';
import { MatSelectChange } from '@angular/material/select';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-talaba',
  templateUrl: './talaba.component.html',
  styleUrls: ['./talaba.component.scss']
})

export class TalabaComponent implements OnInit {

  // Chips ma'lumtlarri bilan ishlsh



  talabaForm!: FormGroup;

  talabalar: any[] = [];
  tahrirRejim = false;
  formOchiq = false;

  user!: User;
  rasmManzil!: string;
  surovBajarilmoqda = false;

  talented = false;

  displayedColumns: string[] = ['id', 'ism', 'familya', 'sharif', 'yosh','kurs', 'hudud','ball', 'loyiha', 'info', 'amal'];
  dataSource: any;
  filter = new FormControl('filter')

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  rasm: any;

  constructor(private fb: FormBuilder,
    private talabaService: TalabaService,
    private snakBar: MatSnackBar,
    private faylService: FaylService,
    private accountService: AccountService,


  ) { }
  ngAfterViewInit(): void {

    this.load();
    console.log(this.talabalar);
    
  }

  ngOnInit(): void {


    this.talabaForm = this.fb.group({
      id: [],
      ism: ['', Validators.required],
      familya: ['', Validators.required],
      sharif: ['', Validators.required],
      yosh: [''],
      hudud: [''],
      ball: [],
      talented: [false],
      info: [''],
      kurs:[''],
      amal: ['']
    });



    this.accountService.identity().subscribe(data => {
      if (data) {
        this.user = data;
        this.rasmManzilOzgar();
      }
    })

  }

  

  rasmManzilOzgar() {
    if (this.rasm)
      this.rasmManzil = environment.baseApi + "/api/file/download/" + this.rasm.id;
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
    this.talabaService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {

      console.log(royxat);
      this.talabalar = royxat.content;

      this.length = royxat.totalElements;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {

      let img = new Image();
      let fr = new FileReader();
      fr.onload = (e: any)=>{
          img.onload = (ev)=>{
            this.faylService.uploadFayl(file).subscribe(f=>{
              this.rasm=f;
              this.rasmManzilOzgar();
            })
          }
          img.src = e.target?.result;
      };
      fr.readAsDataURL(file);

    }
  



  }

  saqlash() {
    this.surovBajarilmoqda = true;
    let talaba = this.talabaForm.getRawValue();
    talaba.rasm = this.rasm;


    let surov;
    if (this.tahrirRejim)
      surov = this.talabaService.update(talaba);
    else
      surov = this.talabaService.create(talaba);


    surov.subscribe(data => {
      this.tozalash();
      this.load();
      this.surovBajarilmoqda = false;
    },
      error => {
        this.snakBar.open("Xatolik ro'y berdi", "Ok");
        this.surovBajarilmoqda = false;
      })

    // talented student add





  }



  ochirish(talaba: any) {
    if (confirm("Siz " + talaba.ism + "ni o'chirishga rozimisiz")) {
      this.talabaService.deleteById(talaba.id).subscribe(data => {
        this.load();
      })
    }
  }

  tahrirlash(talaba: any) {
    this.tahrirRejim = true;
    this.talabaForm.reset(talaba);
    this.formOchiq = true;
  }



  tozalash() {
    this.talabaForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }









}

