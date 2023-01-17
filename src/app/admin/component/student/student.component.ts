import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AccountService } from 'src/app/core/account.service';
import { User } from 'src/app/model/user';
import { FaylService } from 'src/app/service/fayl.service';
import { GuruhService } from 'src/app/service/guruh.service';
import { StudentService } from 'src/app/service/student.service';
import { YunalishService } from 'src/app/service/yunalish.service';
import { environment } from 'src/environments/environment';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentlar: any[] = [];
  tahrirRejim = false;
  studentForm!: FormGroup;
  surovBajarilmoqda = false;
  formOchiq = false;
  user!:User;
  rasmManzil!:string;
  rasm: any; 
  guruhlar: any;
  yunalishlar: any;
  // open dialog connect

  animal!:string;
  name!:string;


  displayedColumns: string[] = ['id', 'ism', 'familya', 'sharif' ,'hudud','yosh','ishlashJoyi','yunalish','oqishgaKirYil', 'guruh' , 'oquvShakl' ,'oqishTugYil','info','amal'];
  dataSource: any;
  filter = new FormControl('filter')

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
    private studentService: StudentService,
    private accountService: AccountService,
    private faylService: FaylService,
    private snakBar: MatSnackBar,
    private guruhService: GuruhService,
    private yonalishService: YunalishService,

  ) { }

  
  ngAfterViewInit(): void {

    this.load();
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      id: [''],
      ism: ['', Validators.required],
      familya: ['', Validators.required],
      sharif: ['', Validators.required],
      hudud: ['', Validators.required],
      yosh: [],
      ishlashJoyi: [''],
      oqishgaKirYil: [],
      oquvShakl:[Validators.required],
      oqishTugYil: [''],
      guruh: ['',Validators.required],
      yunalish: ['',Validators.required],
      info: ['']
    });
   
    this.studentService.getAll('').subscribe(data => {
      this.studentlar = data.content;
    })
    this.guruhService.getAll('').subscribe(data=>{
      this.guruhlar = data.content;
    })
    this.yonalishService.getAll('').subscribe(data=>{
      this.yunalishlar = data.content;
    })

    this.accountService.identity().subscribe(data=>{
      if(data){
        this.user=data;
        this.rasmManzilOzgar();
      }
    })
  }
  rasmManzilOzgar(){
    if(this.rasm)
    this.rasmManzil = environment.baseApi + "/api/file/download/"+this.rasm.id;
    
  }

  onFileSelected(event: any){
    const file:File = event.target.files[0];
    if(file){
      this.faylService.uploadFayl(file).subscribe(f=>{
        this.rasm=f;
        this.rasmManzilOzgar();
       
      })
    }

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
    this.studentService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {

      console.log(royxat);
      this.studentlar = royxat.content;

      this.length = royxat.totalElements;
    });
  }

  saqlash() {
    this.surovBajarilmoqda = true;
    let student = this.studentForm.getRawValue();
    student.rasm = this.rasm;
    let surov;
    if (this.tahrirRejim)
      surov = this.studentService.update(student);
    else
      surov = this.studentService.create(student);
   

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
  ochirish(student: any) {
    if (confirm("Siz " + student.ism + "ni o'chirishga rozimisiz")) {
      this.studentService.deleteById(student.id).subscribe(data => {
        this.load();
      })
    }
  }

  tahrirlash(student: any) {
    this.tahrirRejim = true;
    this.studentForm.reset(student);
    this.formOchiq = true;
  }

  tozalash() {
    this.studentForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }
}
