import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
 
import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AddPopoverPageModule } from './pages/private/add-popover/add-popover.module';
import { AddEventPopoverPageModule } from './pages/private/add-event-popover/add-event-popover.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddTaskPopoverPageModule } from './pages/private/add-task-popover/add-task-popover.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { FormsModule } from '@angular/forms';
import { QrcodeDetectedPopoverPageModule } from './pages/private/qrcode-detected-popover/qrcode-detected-popover.module';
 
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('jmvhDdDBMvqb=M@6h&QVA7x');
    },
    whitelistedDomains: ['localhost:3000']
  }
}
 
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  HttpClientModule, FormsModule,
  IonicStorageModule.forRoot(), AddPopoverPageModule, AddEventPopoverPageModule, AddTaskPopoverPageModule, QrcodeDetectedPopoverPageModule,
  JwtModule.forRoot({
    jwtOptionsProvider: {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory,
      deps: [Storage],
    }
  }),
  ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}