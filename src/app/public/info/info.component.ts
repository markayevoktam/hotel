import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fruit } from 'src/app/admin/component/talaba/talaba.component';
import { Talaba } from 'src/app/model/talaba';
import { PublicService } from 'src/app/service/public.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  talaba!: Talaba;
  fruits: Fruit[] = [];

  constructor(private activatedRouter: ActivatedRoute, private publicService: PublicService) { }


  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data => {
      console.log(data);

      if (data && data["id"]) {
        this.publicService.getById(data['id']).subscribe((d: Talaba) => {
          this.talaba = d;
          console.log(d);

        })
      }
    })

  }

  getRasm(file: any) {
    if (file)
      return environment.baseApi + "/api/file/download/" + file.id;
    else return "https://flixarena.com/wp-content/uploads/2020/04/Netflix-Winner.png"
  }

}
