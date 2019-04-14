import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { AddPopoverPage } from '../add-popover/add-popover.page';
import { Item } from './item';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';

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
    constructor(public toastController: ToastController, private popoverController: PopoverController, private storage: Storage, private http: HttpClient, private authService: AuthService) { }

    ngOnInit() {
        this.storage.get('username').then((data) => { this.user = data });
        this.getAllItem();
    }

    itemCheckboxEvent(item)
    {
        if(item.finished)
        {
            this.removeItem(item.item_id);
            item.finished_by = this.user;
            item.finished_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
            this.updateItem(item);
            this.showToast("Item " + item.item_name + " completed successfully", "success");
        }
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
                this.showToast(resp['message'], "danger");
            }

        });
    }

    addItem(newItem: Item) {
        this.http.post(`${this.url}/api/addItem`, newItem).subscribe(resp => {
            if (!resp['success']) 
                this.showToast(resp['message'], "danger");
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

    updateItem(item:Item)
    {
        this.http.post(`${this.url}/api/updateItem`, item).subscribe(resp => {
            if (!resp['success']) 
                this.showToast(resp['message'], "danger");
                 
        });
    }

    logout() {
        this.authService.logout();
    }


}
