import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-add-event-popover',
    templateUrl: './add-event-popover.page.html',
    styleUrls: ['./add-event-popover.page.scss'],
})
export class AddEventPopoverPage implements OnInit {

    constructor(private popoverController: PopoverController) { }

    event = {
        event_id: "",
        title: "",
        desc: "",
        startTime: "",
        endTime: "",
        all_day: "",
        user_id: null
    }

    add = true;

    ngOnInit() {
     
    }

    async closePopover(saved) {
        if (saved)
            await this.popoverController.dismiss(this.event);
        else
            await this.popoverController.dismiss(undefined);
    }
}
