import { Component, OnInit } from '@angular/core';
import {Day} from "../shared/model/day";
import {DayService} from "../shared/model/day.service";

@Component({
  selector: 'edit-day',
  templateUrl: './edit-day.component.html',
  styleUrls: ['./edit-day.component.css']
})
export class EditDayComponent implements OnInit {
  day: Day;

  constructor(public dayService: DayService) {
    this.day = dayService.dayEditing;
  }

  /**
   * LEARN NOTE: So this returns a firebase Promise.
   * Is that good? What could I do with an Observable, if it
   * returned that? What are the benefits of that?
   * How could I make a front-end indication for backend access
   * with these? The promise I could hack it, but I am sure there
   * is a better way. Like I want a global "loading" icon somewhere
   * in the page, which just turns visible, if there is a backend
   * query running anywhere.
   */
  saveTheDay(){
    this.dayService.saveTheDay(this.day);
  }


  ngOnInit() {
  }

}
