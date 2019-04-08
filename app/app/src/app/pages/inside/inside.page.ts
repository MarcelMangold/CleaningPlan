import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-inside',
    templateUrl: './inside.page.html',
    styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

    data = '';

    constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController) { }

    ngOnInit() {
    }

    loadSpecialInfo() {
            this.authService.getSpecialData().subscribe(res => {
            this.data = JSON.stringify(res);
        });
    }

    logout() {
        this.authService.logout();
    }

    clearToken() {
        // ONLY FOR TESTING!
        this.storage.remove(environment.jwt_encryption);

        let toast = this.toastController.create({
            message: 'JWT removed',
            duration: 3000
        });
        toast.then(toast => toast.present());
    }

}