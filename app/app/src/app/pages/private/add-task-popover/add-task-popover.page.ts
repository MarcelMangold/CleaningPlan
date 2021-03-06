import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';

@Component({
    selector: 'app-add-task-popover',
    templateUrl: './add-task-popover.page.html',
    styleUrls: ['./add-task-popover.page.scss'],
})
export class AddTaskPopoverPage implements OnInit {

    isExtendedOptionActive:boolean = false;

    task = {
        taskName: "clean kitchen",
        duration: 1,
        timePeriod: 1,
        finishedOn: 0,
        startDate: null,
        responsibility: null,
        createdBy: null,
    }
    weekdays = [true, false, false, false, false, false, false];
    
    constructor(private modalController: ModalController) { }

    ngOnInit() {
    }

    onChange(checked) {

        this.task.finishedOn = checked;
        for (var i = 0; i < this.weekdays.length; i++) {
            if (i != checked)
                this.weekdays[i] = false;
        }

    }

    async closePopover(saved:boolean) {
        if (saved)
        {
            await this.modalController.dismiss(this.task);
        }
        else
            await this.modalController.dismiss(undefined);
    }


}
