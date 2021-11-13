import { Injectable } from '@angular/core';
import { HTTP  } from '@ionic-native/http/ngx';
import { Status } from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HTTP ) { }

  getStatus() {
    return this.http.get(this.api("/status"),null,null);
  }

  setOnLamp()  {
    return this.put("/lamp/on");
  }

  setOffLamp()  {
    return this.put("/lamp/off");
  }

  setOnFan()  {
    return this.put("/fan/on");
  }

  setOffFan()  {
    return this.put("/fan/off");
  }

  private put(route:string){
   return this.http.put(this.api(route),null,null);
  }

  private api(route: string){
    return `http://192.168.0.200:420${route}`;
  }
}


