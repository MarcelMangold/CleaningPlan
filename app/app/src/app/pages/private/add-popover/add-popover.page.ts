import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-popover',
  templateUrl: './add-popover.page.html',
  styleUrls: ['./add-popover.page.scss'],
})
export class AddPopoverPage implements OnInit {

  constructor(private popoverController: PopoverController) { }
item:any;
  ngOnInit() {
  }

  async closePopover(saved){
        if(saved)
            await this.popoverController.dismiss(this.item);
        else
            await this.popoverController.dismiss(undefined);
  }

}
