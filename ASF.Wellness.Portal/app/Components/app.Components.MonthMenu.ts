import {Component, Input, Inject} from '@angular/core';
import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { Month } from '../Model/app.Model.Month';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-month',
    templateUrl: './app/Components/app.Components.MonthMenu.html'
})
export class MonthMenuComponent {
    monthInfo: Array<Month>;
    monthOffset: number;

    constructor() {
        
    }   

    ngOnInit() {
        
        this.monthOffset = 0;
        this.monthInfo = this.getMonthInformation(this.monthOffset);
    }

    previous() {
        this.monthOffset = this.monthInfo[2].offset - 5;
        this.monthInfo = this.getMonthInformation(this.monthOffset);
    }

    next() {
        this.monthOffset = this.monthInfo[2].offset + 5;
        this.monthInfo = this.getMonthInformation(this.monthOffset);
    }


    setOffset(offset: number) {

        for (let item of this.monthInfo) {
            if (item.offset == offset) {
                item.selected = true;
            }
            else {
                item.selected = false;
            }
        }
    }

    getMonthInformation(offset: number): Array<Month> {
        let date = new Date();
        date.setDate(1);
        let currentMonthIndex = date.getMonth() + offset;

        let firstDate = new Date();
        firstDate.setDate(1);
        let firstOffset = currentMonthIndex - 2;
        firstDate.setMonth(firstOffset);

        let secondDate = new Date();
        secondDate.setDate(1);
        let secondOffset = currentMonthIndex - 1;
        secondDate.setMonth(secondOffset);

        let thirdDate = new Date();
        thirdDate.setDate(1);
        thirdDate.setMonth(currentMonthIndex);

        let fourthDate = new Date();
        fourthDate.setDate(1);
        let fourthOffset = currentMonthIndex + 1;
        fourthDate.setMonth(fourthOffset);

        let fifthDate = new Date();
        fifthDate.setDate(1);
        let fifthOffset = currentMonthIndex + 2;
        fifthDate.setMonth(fifthOffset);

        let monthInfo = [
            new Month({ month: this.getMonthName(firstDate.getMonth()), year: firstDate.getFullYear(), offset: offset - 2, selected: false }),
            new Month({ month: this.getMonthName(secondDate.getMonth()), year: secondDate.getFullYear(), offset: offset - 1, selected: false }),
            new Month({ month: this.getMonthName(thirdDate.getMonth()), year: thirdDate.getFullYear(), offset: offset, selected: true }),
            new Month({ month: this.getMonthName(fourthDate.getMonth()), year: fourthDate.getFullYear(), offset: offset + 1, selected: false }),
            new Month({ month: this.getMonthName(fifthDate.getMonth()), year: fifthDate.getFullYear(), offset: offset + 2, selected: false })
        ];

        return monthInfo;
    }


    getMonthName(monthNumber: number): string {

        var month = new Array<string>();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        return month[monthNumber];
    }
    
}