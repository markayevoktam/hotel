import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";


@NgModule({
    imports: [ CommonModule, MaterialModule, RouterModule],
    declarations: [PageNotFoundComponent ],
  
    exports: [
    
      CommonModule,
      PageNotFoundComponent,
      



    ]
})



export class SharedModule { }