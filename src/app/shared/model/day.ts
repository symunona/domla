// import {Observable} from "rxjs/Rx";


import {CounterTag} from "./counter-tag";
export class Day {

  public $key:string;
  public date: string;
  public title: string;
  public description:string;

  // LEARN NOTE: I am sure this can be done nicer.
  public saved: boolean;
  public tags: string[];
  public counterTags: CounterTag[];

  constructor(extend: any){
    Object.assign(this, extend);
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
