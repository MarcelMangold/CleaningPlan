import { Component, OnInit } from '@angular/core';
import { TimeoutError } from 'rxjs';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-add-task-popover',
    templateUrl: './add-task-popover.page.html',
    styleUrls: ['./add-task-popover.page.scss'],
})
export class AddTaskPopoverPage implements OnInit {

    task = {
        taskName: "clean kitchen",
        duration: "week",
        weekdays: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    }

    constructor(private popoverController: PopoverController) { }

    ngOnInit() {
    }

    onChange(checked)
    {
        console.log(checked);
    }


    async closePopover(saved) {
        if (saved)
        await this.popoverController.dismiss(this.task);
    else
        await this.popoverController.dismiss(undefined);
    }


}
