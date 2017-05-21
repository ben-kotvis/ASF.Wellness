import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { MonthYear } from '../Model/app.Model.MonthYear';

@Injectable()
export class MonthsService {

    private monthChangedSource = new Subject<MonthYear>();

    // Observable string streams
    monthChanged$ = this.monthChangedSource.asObservable();
    // Service message commands
    announceMonthChanged(monthYear: MonthYear) {
        this.monthChangedSource.next(monthYear);
    }

}