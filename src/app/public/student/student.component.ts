import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { PublicService } from 'src/app/service/public.service';
import { StudentService } from 'src/app/service/student.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  studentlar: Student[]=[];
  length=100;

  constructor(private activatedRouter: ActivatedRoute,
     private publicService: PublicService,
     private studentService: StudentService
     ) { }

    
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.load();
    }

  
  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
    }

    this.studentlar = [];
    let params: any = {
      key: key,


      sort: 'id'
    };



    this.studentService.getAll(params).subscribe(royxat => {
      console.log(royxat);
      this.studentlar = royxat.content;
      this.length = royxat.totalElements;
    });

  }

  getRasm(file: any) {
    if (file)
      return environment.baseApi + "/api/file/download/" + file.id;
    else return "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }

}
