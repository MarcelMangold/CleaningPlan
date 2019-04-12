import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AddPopoverPage } from '../add-popover/add-popover.page';
import {Item} from './item';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})


export class ShoppingListPage implements OnInit {
 shoppingList = new Array();
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
    this.shoppingList.push(new Item('Mark', 'Test', 12));
    this.shoppingList.push(new Item('Mark', 'Test', 12));
    this.shoppingList.push(new Item('Mark', 'Test', 12));
    this.shoppingList.push(new Item('Mark', 'Test', 12));
    this.shoppingList.push(new Item('Mark', 'Test', 12));
             /*    "name":"Test1",
                "finished": false,
                "finishhedBy":"Marcel",
                "created":"01.02.2018",
                "finishedAt":"02.05.2019" */

    }

  async openAddItemPopover(ev: Event)
  {
      const popover = await this.popoverController.create({
        component: AddPopoverPage,
        componentProps: {

        },
        event: ev
      });
  
      popover.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null ) {
            if(dataReturned.data != undefined)
            {
                this.shoppingList.unshift(new Item(dataReturned.data , 'Test', 12));
            }
        }   
      });
  
      return await popover.present();

  }


}
