import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jsQR, { QRCode } from 'jsqr';
import { QrcodeDetectedPopoverPage } from '../qrcode-detected-popover/qrcode-detected-popover.page'
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(private authService: AuthService, public modalController: ModalController) { }
    canvasElement: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    outputMessage: string;
    outputData: string;
    video: HTMLVideoElement;
    disabled = true;
   
    ngOnInit() {

    }

    abort() {
        this.disabled = true;
        this.video.pause();
        this.canvasElement.hidden = true;
        this.canvasElement = null;
        this.video = null;
        this.canvasContext = null;
    }

    scan() {
        this.disabled = false;
        this.canvasElement = <HTMLCanvasElement>document.getElementById('scan-canvas');
        this.canvasContext = this.canvasElement.getContext('2d');
        this.createVideo();
    
    }

    createVideo()
    {
        this.video = <HTMLVideoElement>document.createElement('video');

        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(async (stream: MediaStream) => {
            this.video.srcObject = stream;
            this.video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
            await this.video.play();
            requestAnimationFrame(this.tick.bind(this));
        });
    }

    drawLine(begin, end, color): void {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(begin.x, begin.y);
        this.canvasContext.lineTo(end.x, end.y);
        this.canvasContext.lineWidth = 4;
        this.canvasContext.strokeStyle = color;
        this.canvasContext.stroke();
    }

     tick() {
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.canvasElement.hidden = false;

            this.canvasContext.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
            const imageData: ImageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
            const code: QRCode = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
                this.video.pause();
                this.video = null;
                this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
                this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
                this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
                this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
                this.outputMessage = "";
                this.outputData = "Data:" + code.data;
                this.createPopover(code.data);
             
            } else {
                this.outputMessage = "No QR code detected.";
                this.outputData = "";
            }
        }
        requestAnimationFrame(this.tick.bind(this));
    }

    async createPopover(data)
    {
        const popover = await this.modalController.create({
            component: QrcodeDetectedPopoverPage,
            componentProps: {
                qrCode: data
            }
        });

        popover.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                if (dataReturned.data != undefined) {

                }
            }
          
           this.createVideo();
        });
        await popover.present();
    }
    logout() {
        this.authService.logout();
    }
}

