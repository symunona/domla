import {Component, OnInit, Input} from '@angular/core';
import {Day} from "../shared/model/day";
import {Router} from "@angular/router";
import {DayService} from "../shared/model/day.service";

@Component({
  selector: 'day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {

  @Input('day')
  day: Day;

  constructor(private router: Router, private dayService: DayService) {
  }

  ngOnInit() {
  }

  editDay(day: Day) {
    // this.dayService.dayEditing = day;
    return this.router.navigate(['days/' + day.date]);
  }

}
