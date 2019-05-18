import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastController, ModalController } from '@ionic/angular';
import { AddTaskPopoverPage } from '../add-task-popover/add-task-popover.page';
import { Storage } from '@ionic/storage';
import { environment } from '../../../../environments/environment';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';



@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    loaderToShow: any;
    automaticClose = false;
    user_id: number;
    toast;
    url = environment.url;


    constructor(protected loading: LoadingService, private loadingController: LoadingController, private authService: AuthService, private http: HttpClient, private modalController: ModalController, private storage: Storage, private toastController: ToastController) {
    }


    information: any[];

    async ionViewWillEnter() {
        await this.loading.present('HomePage.ngOnInit', 'Loading messages...');
        this.storage.get('user_id').then((data) => { this.user_id = data });

        this.http.get('assets/information.json').subscribe(async res => {
            this.information = res['items'];
            this.information[0].open = true;
            this.loading.dismiss('HomePage.ngOnInit');
        });
    }

    ngOnInit() {
    }

    async openAddTaskPopover() {
        const popover = await this.modalController.create({
            component: AddTaskPopoverPage,
            componentProps: {

            },
            cssClass: 'pop-over-style-add-task'
        });

        popover.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                if (dataReturned.data != undefined) {
                    dataReturned.data.user_id = this.user_id;
                    console.log(JSON.stringify(dataReturned.data));
                    this.addTaskToDatabase(dataReturned.data).then( () =>  this.showToast("erfolgreich", "success", "top"))
                    .catch( error =>  this.showToast(error, "danger", "top"));
                }
            }
        });

        return await popover.present();

    }

    addTaskToDatabase(task) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/api/addTask`, task, {observe: 'response'}).subscribe(resp => {
                if (resp.status === 200) {
                    this.showToast("erfolgreich", "success", "top");
                    resolve()
                }
          
            }, error => {
                reject(error);
            });
        });
    }


    showToast(message, color, position) {
        this.toast = this.toastController.create({
            message: message,
            duration: 2000,
            showCloseButton: true,
            position: position,
            closeButtonText: 'OK',
            color: color
        }).then((toastData) => {
            toastData.present();
        });
    }
    HideToast() {
        this.toast = this.toastController.dismiss();
    }

    toogleSection(index) {
        this.information[index].open = !this.information[index].open;

        if (this.automaticClose && this.information[index].open) {
            this.information
                .filter((item, itemIndex) => itemIndex != index)
                .map(item => item.open = false);
        }
    }

    tooglesSection(index, childIndex) {
        this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
    }



    logout() {
        this.authService.logout();
    }

}
