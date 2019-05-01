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
        timePeriod: 1,
        duration: 1,
        finishedOn: 0
    }
    weekdays = [true, false, false, false, false, false, false];
    
    constructor(private popoverController: PopoverController) { }

    ngOnInit() {
    }

    onChange(checked) {

        this.task.finishedOn = checked;
        for (var i = 0; i < this.weekdays.length; i++) {
            if (i != checked)
                this.weekdays[i] = false;
        }

    }

    async closePopover(saved) {
        if (saved)
            await this.popoverController.dismiss(this.task);
        else
            await this.popoverController.dismiss(undefined);
    }


}
