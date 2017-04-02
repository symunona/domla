import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import * as moment from "moment";
import {DayService} from "../shared/model/day.service";
import {Day} from "../shared/model/day";

@Component({
  selector: 'day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.css']
})
export class DayListComponent implements OnInit {

  days$: FirebaseListObservable<any[]>;
  list: Day[];

  constructor(private af: AngularFire, private dayService: DayService) {

    var range = 5;
    var today = moment().startOf('day').toDate();
    var firstDay = moment().startOf('day').add(-range, 'days').toDate();

    // LEARN NOTE: Here I am not sure if this is the right pattern
    // to subscribe to the days.
    dayService.findAllDays().subscribe(days=>{
      this.list = dayService.getDayRangeList(firstDay, today, days);
    });
  }

  ngOnInit() {
  }

}
