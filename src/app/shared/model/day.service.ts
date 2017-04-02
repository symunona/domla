/**
 * All database access functions are gathered here.
 * This file handles everything from reading the user's
 * day's list, to writing each day, through returning
 * a range of days open to selection.
 */

import {Injectable, Inject} from '@angular/core';
import {AngularFireDatabase, FirebaseRef} from "angularfire2";
import {Observable, Subject} from "rxjs/Rx";
import {Day} from "./day";
import * as moment from "moment";
import {AuthService} from "../security/auth.service";

@Injectable()
export class DayService {

  userDb: firebase.database.Reference;
  dayEditing: Day;
  userRoot: string;

  constructor(private db: AngularFireDatabase,
              @Inject(FirebaseRef) fb,
              private authService: AuthService) {

    // Initialize the user's db. Once we get a user,
    // set the root to

    // LEARN NOTE: I am not understanding what s the difference
    // between creating a reference through an instance of
    // AngularFireDatabase.object (in i.e. findAllDays, #2) vs
    // creating a reference to a specific spot #1.
    // Why can not I subscribe to an endpoint of a specific
    // reference?

    authService.userObservable.subscribe(user => {

      // If there is no user present, the latter would
      // fail, i.e. at logout.
      // LEARN NOTE: Is this the right way of handling this?
      // How can I bootstrap that this does not run/fail, when we
      // log out?
      if (!user) return;
      // Save that root in a string, because we can not
      // call ref.list or ref.object for some reason...
      this.userRoot = 'users/' + user.uid + '/';

      // #1 Create a reference to the user's root
      this.userDb = fb.database().ref(this.userRoot);

    });

  }

  /**
   * Return all the days of the user. Since we are talking about
   * < 1-2mb of data, this should not be a problem.
   * @returns {Observable<T>}
   */
  findAllDays(): Observable<Day[]> {
    // #2
    return this.db.object(this.userRoot + 'days').do(() => {
      console.log('findAllDaysEval', this.userRoot + 'days')
    });
  }


  /**
   * Not all days are stored in the database, only the ones the
   * user already touched. But we still have to return an empty
   * Day object, so when the user touches it, it can serialize.
   * This function returns a list of days, filled with backend
   * data where applicable and empty Day objects which will
   * save at the first modification.
   *
   * @param fromDay {Date} first day of the list
   * @param toDay {Date} last day of the list
   * @param dayList {Object} map of the days in the DB.
   * @returns {Array} The list of Days to be rendered.
   */

  getDayRangeList(fromDay: Date, toDay: Date, dayList: Object): any[] {
    let daysToGo = moment(toDay).diff(fromDay, 'days');

    let list = [];
    for (let i = 0; i <= daysToGo+1; i++) {
      let key = moment(fromDay).add(i, 'days').format('YYYY-MM-DD');
      list.push(new Day(dayList[key] || {date: key, saved: !!dayList[key]}));
    }
    return list;
  }

  /**
   * NOTE: not used anywhere.
   *
   * Saves a new day (not existing on the server side yet).
   *
   * LEARN NOTE: Why would they have it like this instead of
   * my simplified version
   *
   * @param day
   * @returns {Observable<T>}
   */
  saveNewDay(day: Day) {
    const dayToSave = Object.assign({}, day);
    // LEARN NOTE: Is there a better & nicer way to do this?
    delete(dayToSave.$key);

    let dataToSave = {};
    dataToSave[`days/${day.date}`] = dayToSave;

    return this.firebaseUpdate(dataToSave);

  }

  /**
   * Finds a day in the by it's day field.
   *
   * LEARN NOTE: I really wanted to do this with
   * some better way, since my keys are the days to be
   * identified, but got lost in the types.
   *
   * @param day
   * @returns {Observable<R>}
   */
  findDayByDate(day: string): Observable<Day> {

    console.log('[findDayByDate]', day);
    return this.db.list(this.userRoot + 'days/', {
      query: {
        orderByChild: 'date',
        equalTo: day
      }
    })
      .do(console.log)
      .map(days => days[0]);
  }

  /**
   * I could not help myself.
   *
   * It saves a Day object, updates or
   *
   * @param day
   * @returns {firebase.Promise<void>}
   */
  saveTheDay(day: Day) {

    let dayRef = this.db.object(this.userRoot + 'days/' + day.date);

    if (day.saved) {

      console.log('[saveTheDay] updating', day);
      return dayRef.update(day);
    }
    else {
      console.log('[saveTheDay] saving', day);
      return dayRef.set(day);
    }
  }

  /**
   * NOTE: Only used in saveNewDay, which is not used anywhere.
   *
   * Updates a specific place in the database.
   *
   * LEARN NOTE: I have no clue why this is necessary, what
   * the hack is a subject object, why are we returning as
   * an observable?
   * In fact, I am not sure I understand the difference
   * between an Angular Observable vs a Promise. An angular
   * observable sounds like an object what you can subscribe
   * to, i.e. a knockout Computed, which "somehow" knows
   * when the content changes, and then notifies the subscribers.
   * This magic I guess is deeper, and needs some clarification
   * for me in Angularland.
   *
   * @param dataToSave {Object} the object to be written
   * to the user's root.
   * @returns {Observable<T>} A magic observable
   * Wish I knew
   * What can I do with you,
   * salalaaa
   */

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.userDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();

        },
        err => {
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }

  // getNewDay(day: Date) {
  //   // TODO: Find last day before the day, and copy the counter tags here
  //   // return new Day({day.toString(), day, '', '', [], []})
  // }

}
