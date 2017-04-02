// import {Observable} from "rxjs/Rx";


export class CounterTag {

  constructor(
    public $key:string,
    public title: string,
    public startDate: Date,
    public endDate: Date
  ){
  }

  static fromJson({$key, title, startDate, endDate}) {
    return new CounterTag($key, title, startDate, endDate);
  }

  static fromJsonArray(json : any[]) : CounterTag[] {
    return json.map(CounterTag.fromJson);
  }


}


