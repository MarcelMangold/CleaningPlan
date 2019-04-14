import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { PopoverController, ToastController } from '@ionic/angular';
import { AddEventPopoverPage } from '../add-event-popover/add-event-popover.page';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
    user_id: number;
    user: string;
    eventSource = [];
    viewTitle;
    currentHour;
    toast;
    url = environment.url;
    startTime;
    endTime;
    reloadSource;
    isToday: boolean;

    event = {
        event_id: "",
        title: "",
        desc: "",
        startTime: "",
        endTime: "",
        all_day: false,
        user_id: null,
    }

    @ViewChild(CalendarComponent) myCal: CalendarComponent;

    calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function (date: Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function (date: Date) {
                return date.toLocaleString('de-DE', {
                    weekday: "short",
                });
            },
            formatMonthViewTitle: function (date: Date) {
                return date.toLocaleString('de-DE', {
                    month: "short",
                });
            },
            formatWeekViewDayHeader: function (date: Date) {
                return date.toLocaleString('de-DE', {
                    day: "2-digit",
                });
            },
            formatWeekViewTitle: function (date: Date) {
                return date.toLocaleString('de-DE', {
                    month: "short",
                }) + " KW";
            },
            formatWeekViewHourColumn: function (date: Date) {
                return date.toLocaleString('de-DE', {
                    hour: "2-digit",
                });
            },
            formatDayViewHourColumn: function (date: Date) {
                return date.toLocaleString('de-DE', {
                    hour: "2-digit",
                });
            },
            formatDayViewTitle: function (date: Date) {
                return date.toLocaleString('de-DE', {
                    day: "2-digit",
                });
            }
        }
    };

    constructor(private authService: AuthService, private storage: Storage, private popoverController: PopoverController, private http: HttpClient, private toastController: ToastController) { }


    ngOnInit() {
        this.storage.get('username').then((data) => { this.user = data });
        this.storage.get('user_id').then((data) => { this.user_id = data });
        let date = new Date()
        this.currentHour = date.getHours();
        this.resetEvent();
        this.getEventsFromDatabase();
    }

    resetEvent() {
        this.event = {
            event_id: "",
            title: "",
            desc: "",
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            all_day: false,
            user_id: this.user_id
        }
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    async addEvent() {
        let eventCopy = {
            event_id: "",
            title: this.event.title,
            desc: this.event.desc,
            startTime: new Date(this.event.startTime),
            endTime: new Date(this.event.endTime),
            all_day: this.event.all_day,
            user_id: this.user_id
        }
        const popover = await this.popoverController.create({
            component: AddEventPopoverPage,
            componentProps: {
                event: eventCopy
            },
            cssClass: 'pop-over-style'
        });

        popover.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                if (dataReturned.data != undefined) {
                    eventCopy = dataReturned.data;
                    eventCopy.user_id = this.user_id
                    eventCopy.startTime = new Date(eventCopy.startTime);
                    eventCopy.endTime = new Date(eventCopy.endTime);
                    if (eventCopy.all_day) {
                        let start = eventCopy.startTime;
                        let end = eventCopy.endTime;
                        eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
                        eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));


                    }
                    this.eventSource.push(eventCopy);
                    this.myCal.loadEvents();
                    this.addEventToDabase(eventCopy);


                }
            }
        });

        return await popover.present();
    }

    addEventToDabase(eventDatabase) {
        eventDatabase.startTime = new Date(eventDatabase.startTime).toISOString().slice(0, 19).replace('T', ' ')
        eventDatabase.endTime = new Date(eventDatabase.endTime).toISOString().slice(0, 19).replace('T', ' ')
        this.http.post(`${this.url}/api/addEvent`, eventDatabase).subscribe(resp => {
            if (!resp['success']) {
                this.showToast(resp['message'], "danger");
                this.eventSource.pop;
                this.myCal.loadEvents();
            }
            else {
                this.eventSource[this.eventSource.length - 1].event_id = resp['insertId'];
            }
        });
    }

    getEventsFromDatabase() {
        this.http.get(`${this.url}/api/getEvents`).subscribe(resp => {
            if (resp['results']) {
                this.eventSource = this.transformDate(resp['results']);
            }
            else {
                this.showToast(resp['message'], "danger");
            }

        });

    }

    transformDate(events) {
        let transformedEvents = [];
        events.forEach(element => {
           transformedEvents.push({
            event_id: element.event_id,
            title: element.event_name,
            desc: element.description,
            startTime:  new Date(element.start_time),
            endTime: new Date(element.end_time),
            all_day: element.all_day,
            user_id: element.user_id
           });
        });
        return transformedEvents;
    }

    showToast(message, color) {
        this.toast = this.toastController.create({
            message: message,
            duration: 2000,
            showCloseButton: true,
            position: 'top',
            closeButtonText: 'OK',
            color: color
        }).then((toastData) => {
            toastData.present();
        });
    }
    HideToast() {
        this.toast = this.toastController.dismiss();
    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };



    logout() {
        this.authService.logout();
    }

}
