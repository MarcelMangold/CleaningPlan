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
    alltasks = [];



    constructor(protected loading: LoadingService, private loadingController: LoadingController, private authService: AuthService, private http: HttpClient, private modalController: ModalController, private storage: Storage, private toastController: ToastController) {
    }


    information: any[];

    async ionViewWillEnter() {

        this.storage.get('user_id').then((data) => { this.user_id = data });

        this.http.get('assets/information.json').subscribe(async res => {
            this.information = res['items'];
            this.information[0].open = true;

        });
        this.getCurrentTaks();

    }

    getNextMonday() {
        var nextMonday = new Date();
        nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
        return nextMonday;
    }




    ngOnInit() {
    }


    async getCurrentTaks() {
        this.alltasks = [];
        await this.loading.present('HomePage.ngOnInit', 'Loading messages...');
        this.http.post(`${this.url}/api/currentTask`, { userId: this.user_id }, { observe: 'response' }).subscribe(resp => {
            if (resp.status === 200) {
                let thisWeekTasks;
                let thisNextWeeksTasks;
                let thisNextWeekTask = [];
                let thisWeekTask = [];

                let nextMonday = this.getNextMonday();
                resp.body['tasks'].forEach(element => {
                    if (new Date(element.finished_at) > nextMonday)
                        thisNextWeekTask.push(element);
                    else
                        thisWeekTask.push(element);
                    element.finished = false;

                });

                thisWeekTasks = {
                    name: "This week",
                    tasks: thisWeekTask
                }

                thisNextWeeksTasks = {
                    name: "Next weeks",
                    tasks: thisNextWeekTask
                }

                this.alltasks.push(thisWeekTasks);
                this.alltasks.push(thisNextWeeksTasks);
            }
            this.loading.dismiss('HomePage.ngOnInit');

        }, error => {
            this.loading.dismiss('HomePage.ngOnInit');
            this.showToast(error, "danger", "top");
        });

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
                    this.addTaskToDatabase(dataReturned.data).then(() => {
                        this.getCurrentTaks();
                        this.showToast("erfolgreich", "success", "top");
                    }
                    )
                        .catch(error => this.showToast(error, "danger", "top"));
                }
            }
        });

        return await popover.present();

    }

    addTaskToDatabase(task) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/api/addTask`, task, { observe: 'response' }).subscribe(resp => {
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
        this.alltasks[index].open = !this.alltasks[index].open;

        if (this.automaticClose && this.alltasks[index].open) {
            this.alltasks
                .filter((item, itemIndex) => itemIndex != index)
                .map(item => item.open = false);
        }
    }

    tooglesSection(index, childIndex) {
        this.alltasks[index].tasks[childIndex].open = !this.alltasks[index].tasks[childIndex].open;
    }



    logout() {
        this.authService.logout();
    }

}
