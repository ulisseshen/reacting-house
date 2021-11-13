import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { Status } from "../model/Message";
import { Observable } from 'rxjs';
import { HTTPResponse } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ventilador: boolean;
  lampada: boolean;

  constructor(private data: DataService, private toast: ToastController) { }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  ngOnInit() {
    let status:Status;

    this.data.getStatus()
    .then((response)=>{
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    console.log(status);
  }

  changeLampada(newValue: boolean) {
    let $return: Promise<HTTPResponse>;
    if (newValue)
      $return = this.data.setOnLamp();
    else
      $return = this.data.setOffLamp();

      this.handleToast("Lampada");

    $return.then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
      //this.lampada = !newValue;
    });
  }

  onClickLampada(oldValue:boolean){
    let $return: Promise<HTTPResponse>;
    if (oldValue !== undefined && oldValue)
    $return = this.data.setOffLamp();
    else
    $return = this.data.setOnLamp();      

    $return.then((response) => {
      console.log(response);
    }).catch((error) => {
      this.handleToast("Não foi possível mudar o status da lâmpada.");
      console.log(error);
      this.lampada = oldValue;
    });
  }

  changeVentilador(newValue: boolean) {
    let $return: Promise<HTTPResponse>;
    if (newValue)
      $return = this.data.setOnFan();
    else
      $return = this.data.setOffFan();

    this.handleToast("Ventilador");

    $return.then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
      //this.ventilador = !newValue;
    });
  }

  async handleToast(message:string) {
    const toast = await this.toast.create({
      color: 'dark',
      duration: 4000,
      message: message,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await toast.present();
  }
}


