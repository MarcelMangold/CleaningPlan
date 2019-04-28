import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../shopping-list/item';
import { PopoverController } from '@ionic/angular';
import { AddTaskPopoverPage } from '../add-task-popover/add-task-popover.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    automaticClose = false;
    
    constructor(private authService: AuthService, private http: HttpClient, private popoverController: PopoverController,) {
        this.http.get('assets/information.json').subscribe(res => {
            this.information = res['items'];

            this.information[0].open = true;
        })
     }

    information: any[];


    ngOnInit() {

    }

    async openAddTaskPopover(ev: Event) {
        const popover = await this.popoverController.create({
            component: AddTaskPopoverPage,
            componentProps: {

            },
            cssClass: 'pop-over-style',
            event: ev
        });

        popover.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                if (dataReturned.data != undefined) {
                  
                }
            }
        });

        return await popover.present();

    }

    toogleSection(index){
        this.information[index].open = !this.information[index].open;

        if(this.automaticClose && this.information[index].open)
        {
            this.information
            .filter((item, itemIndex) => itemIndex != index)
            .map(item => item.open = false);
        }
    }

    tooglesSection(index, childIndex)
    {
        this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
    }

   

    logout() {
        this.authService.logout();
    }

}
