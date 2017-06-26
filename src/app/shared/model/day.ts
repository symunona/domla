// import {Observable} from "rxjs/Rx";

declare var moment: any;


import {CounterTag} from "./counter-tag";
import {Moment} from 'moment'
export class Day {

  public $key:string;
  public date: string;
  public title: string;
  public description:string;

  // LEARN NOTE: I am sure this can be done nicer.
  public saved: boolean;
  public tags: string[] = [];
  public counterTags: CounterTag[];

  constructor(extend: any){
    Object.assign(this, extend);
  }

  weekDay():string{
    // console.log(moment, moment(this.date, 'YYYY-MM-DD').format('D'))
    return moment(this.date, 'YYYY-MM-DD').format('dddd');
  }

  isWeekend(){
    let today = moment(this.date, 'YYYY-MM-DD').day()
    // LEARN NOTE:
    // Ez miért fut le folyamatosan, amikor scrollozom?
    // console.log(today, 'is weekend', (today == 0) || (today == 6))
    return (today === 0) || (today === 6);
  }
  isToday(){
    return moment().format('YYYY-MM-DD') === this.date;
  }

  /**
   * Creates a Day object from JSON data.
   * @returns {Day}
   */
  static fromJson({$key, date, title, description, tags, counterTags}) {
    let day = new Day(null);
    Object.assign(day, {$key, date, title, description, tags, counterTags});
    return day;
  }

  /**
   * Creates an array of Day objects from the raw JSON data.
   * @param json {Array} data received from server.
   * @returns {Day[]}
   */
  static fromJsonArray(json : any[]) : Day[] {
    return json.map(Day.fromJson);
  }
}
