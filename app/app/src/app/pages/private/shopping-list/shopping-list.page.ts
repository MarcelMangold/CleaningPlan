import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { AddPopoverPage } from '../add-popover/add-popover.page';
import { Item } from './item';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.page.html',
    styleUrls: ['./shopping-list.page.scss'],
})


export class ShoppingListPage implements OnInit {
    shoppingList = new Array();
    user: string;
    url = environment.url;
    item;
    toast;
    constructor(public toastController: ToastController, private popoverController: PopoverController, private storage: Storage, private http: HttpClient) { }

    ngOnInit() {
        this.storage.get('username').then((data) => { this.user = data });
        this.getAllItem();
    }

    itemCheckboxEvent(item)
    {
        if(item.finished)
            this.removeItem(item.item_id);
    }

    showToast(message) {
        this.toast = this.toastController.create({
            message: message,
            duration: 2000,
            showCloseButton: true,
            position: 'top',
            closeButtonText: 'OK',
            color: 'danger'
        }).then((toastData) => {
            toastData.present();
        });
    }
    HideToast() {
        this.toast = this.toastController.dismiss();
    }

    async openAddItemPopover(ev: Event) {
        const popover = await this.popoverController.create({
            component: AddPopoverPage,
            componentProps: {

            },
            event: ev
        });

        popover.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                if (dataReturned.data != undefined) {
                    var newItem = new Item(null,dataReturned.data, null, this.user, new Date().toISOString().slice(0, 19).replace('T', ' '), null, false)
                    this.shoppingList.unshift(newItem);
                    this.addItem(newItem);
                }
            }
        });

        return await popover.present();

    }

    getAllItem() {
        this.http.get(`${this.url}/api/getItems`).subscribe(resp => {
            if (resp['results']) {
              this.shoppingList = resp['results'];
            }
            else {
                this.showToast(resp['message']);
            }

        });
    }

    addItem(newItem: Item) {
        this.http.post(`${this.url}/api/addItem`, newItem).subscribe(resp => {
            if (!resp['success']) 
                this.showToast(resp['message']);
            else
                this.shoppingList[0].item_id = resp['insertId'];
        });
    }

    removeItem(id:number)
    {
        this.shoppingList.forEach(async (element, index) => {
            if(element.item_id === id)
            {
                await new Promise(resolve => setTimeout(resolve, 250));
                this.shoppingList.splice(index,1);
            }
              
        });
    }


}
