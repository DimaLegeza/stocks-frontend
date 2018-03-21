import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { DetailsComponent } from "./element/details.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'new',
        component: DetailsComponent
      },
      {
        path: ':id',
        component: DetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
