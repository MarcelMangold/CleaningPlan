
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    url = environment.url;
    user = null;


    constructor(private http: HttpClient) {

    }

    addItem(newItem) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/api/addItem`, newItem).subscribe(resp => {
                if (!resp['success'])
                    reject({"message": resp['message'], color: "danger" });
                else
                    resolve({ "id": resp['insertId'] });
            });
        });
    }
}
