import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Day} from "./day";
import {DayService} from "./day.service";


@Injectable()
export class DayResolver implements Resolve<Day> {


  constructor(private dayService: DayService) {
}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Day> {

    return this.dayService
      .findDayByDate(route.params['date'])
      .first();
  }

}
