import { Component, OnInit } from '@angular/core';
import { TalabaService } from 'src/app/service/talaba.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-talentd',
  templateUrl: './talentd.component.html',
  styleUrls: ['./talentd.component.scss']
})
export class TalentdComponent implements OnInit {

  talabalar: any[] = [];

  constructor(private talabaService: TalabaService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.talabaService.getAllTalented({}).subscribe(data => {
      this.talabalar = data.content;
    });
  }


  getRasm(file: any) {
    if (file)
      return environment.baseApi + "/api/file/download/" + file.id;
    else return "https://idrok.net/logo.png"
  }

}
