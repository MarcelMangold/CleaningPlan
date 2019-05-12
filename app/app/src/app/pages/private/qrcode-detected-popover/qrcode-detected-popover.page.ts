import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qrcode-detected-popover',
  templateUrl: './qrcode-detected-popover.page.html',
  styleUrls: ['./qrcode-detected-popover.page.scss'],
})
export class QrcodeDetectedPopoverPage implements OnInit {

  constructor(private modalController: ModalController) { }
  qrCode:string;
  name:string;
  location:string;
  isCurrentOccupied:boolean;
  startTime:Date;
  endTime:Date;
  existDevice:boolean;
  ngOnInit() {
      this.name = "testgerät";
      this.location = "unten";
      this.isCurrentOccupied = false;
      this.existDevice = true;
  }

  async closeModal() {
    await this.modalController.dismiss(undefined);
}
}
