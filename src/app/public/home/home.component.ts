import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Talaba } from 'src/app/model/talaba';
import { FakultetService } from 'src/app/service/fakultet.service';
import { GuruhService } from 'src/app/service/guruh.service';
import { PublicService } from 'src/app/service/public.service';
import { StudentService } from 'src/app/service/student.service';
import { TalabaService } from 'src/app/service/talaba.service';
import { YunalishService } from 'src/app/service/yunalish.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  talabalar: Talaba[] = [];
  key: any;
  filter = new FormControl('filter')
  fakultetlar: any;
  studentlar: any;
  yunalishlar: any;
  guruhlar: any;


  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tanlanganFakultet: any;
  tanlanganYunalish: any;
  tanlanganGuruh: any;


  constructor(private publicService: PublicService,
    private talabaService: TalabaService,
    private fakultetService: FakultetService,
    private yunalishService: YunalishService,
    private guruhService: GuruhService,
    private studentService: StudentService,


  ) { }
  ngAfterViewInit(): void {
    this.load();
    this.fakultetService.getAll('').subscribe(data => {
      this.fakultetlar = data.content;
    })
    this.yunalishService.getAll('').subscribe(data => {
      this.yunalishlar = data.content;
    })
    this.guruhService.getAll('').subscribe(data => {
      this.guruhlar = data.content;
      console.log(data);
      // console.log(data.content);
      
      
    })
    this.studentService.getAll('').subscribe(data=> {
      this.studentlar = data.content;
    })

  }

  ngOnInit(): void {



  }

  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
    }

    this.talabalar = [];
    let params: any = {
      key: key,

      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    };

    if (this.tanlanganGuruh) {
      params.guruh = this.tanlanganGuruh.id;
    }
    if (this.tanlanganFakultet) {
      params.fakultet = this.tanlanganFakultet.id;
    }
    if (this.tanlanganYunalish) {
      params.yunalish = this.tanlanganYunalish.id;
    }



    this.publicService.getAll(params).subscribe(royxat => {
      console.log(royxat);
      this.talabalar = royxat.content;
      this.length = royxat.totalElements;
    });

  }



  fakultetTanlash(event: any) {

    this.tanlanganFakultet = event.value;
    this.tanlanganYunalish = null;
    this.tanlanganGuruh = null;
    console.log(this.tanlanganFakultet);
    this.paginator.pageIndex = 0;
    this.load();

  }

  yunalishTanlash(event: any) {
    this.tanlanganYunalish = event.value;
    this.tanlanganGuruh = null;
    console.log(this.tanlanganYunalish);
    this.paginator.pageIndex = 0;
    this.load();


  }



  guruhTanlash(event: any) {
    this.tanlanganGuruh = event.value;
    this.paginator.pageIndex = 0;
    this.load();
  }

  getRasm(file: any) {
    if (file)
      return environment.baseApi + "/api/file/download/" + file.id;
    else return "https://flixarena.com/wp-content/uploads/2020/04/Netflix-Winner.png"
  }

}

