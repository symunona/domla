import {
  Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewChecked,
} from '@angular/core';
import * as moment from "moment";
import {DayService} from "../shared/model/day.service";
import {Day} from "../shared/model/day";
import Moment = moment.Moment;

@Component({
  selector: 'day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.css']
})
export class DayListComponent implements OnInit, AfterViewChecked {

  list: Day[];
  scrolledManually: boolean = false;

  range = 10;

  @ViewChild('daysContainer') private daysContainer: ElementRef;

  constructor(private dayService: DayService
  //            , private cdr: ChangeDetectorRef
  ) {

    // LEARN NOTE: Here I am not sure if this is the right pattern
    // to subscribe to the days.
    dayService.findAllDays().subscribe(days=>{
      console.log('[DayService] constructor: list update subscription', days);

      // LEARN NOTE: I'd love to have two sourced observable stream here. One is from
      // the days array, the other depending on the variable, i.e. infinite top-scroll.
      let today = moment().startOf('day');

      // Get the first day key from the first logged day, set the range that.
      let firstDay:Moment;
      // Minimum range, or the first day in the DB.
      if (Object.keys(days).length) {
        let firstDayMoment = moment.parseZone(Object.keys(days).sort()[0], 'YYYY-MM-DD');
        if (today.diff(firstDayMoment, 'days') > this.range){

          firstDay = firstDayMoment.startOf('day');
        }
        else{
          firstDay = moment().startOf('day').add(-this.range, 'days');
        }
      }
      else{
        firstDay = moment().startOf('day').add(-this.range, 'days');
      }

      this.list = dayService.getDayRangeList(firstDay.toDate(), today.toDate(), days);

      // LEARNING NOTE: It would be nice to create a trigger here to redraw, and after that
      // do some stuff, once we rendered, i.e. scroll to the correct position.
      // this.scrollToBottom();

    });
  }

  /**
   * If not scrolled away, always be at the bottom!
   */
  ngAfterViewChecked() {
    if (!this.scrolledManually){
      this.scrollToBottom();
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll($event){

    this.scrolledManually = true;

    // This would be the infinite scroll to the upper part.

    // LEARN NOTE: I would suspect I should solve it by creating an observable
    // which have two feeds: 1.- the data from the DB, and 2.- if I am at the top
    // to increase the range. However I am troubled with how would I stay in one place
    // on the page, when adding a certain number of elements.
    // My first guess would be save the actual DOM height of the list, and once it's re-rendered
    // (how do I know, when render ran? ngAfterViewChecked first time after render?)
    // I would scroll to newListHeight-oldListHeight + whatWasTheYOffsetOfTheScreenOnTheLastList
    // For that I think I could do all, except of the dual source observable and not sure
    // if it's the correct approach handling an upwards infinite scroll list.
    // (Like whatsapp of slack)

    // if (this.daysContainer.nativeElement.scrollTop < 50){
    //   console.log('at the top', $event);
    //
    //   // I want to rerender the list, and stay where I was here...
    //   // This is most likely not the right approach, since it does not work.
    //   this.cdr.detectChanges();
    //
    // }
  }


  ngOnInit() {
  }

  scrollToBottom(): void {
    console.log('scrolling to bottom');
    try {
      this.daysContainer.nativeElement.scrollTop = this.daysContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
