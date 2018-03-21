import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'stock-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  public id = 0;

  constructor(routeSnapshot: ActivatedRoute) {
    console.log(routeSnapshot.snapshot.params);
  }
}
