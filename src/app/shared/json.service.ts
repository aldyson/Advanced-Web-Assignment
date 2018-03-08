import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Constants } from "./constants";

@Injectable()
export class JsonService {

    constructor(private http: Http) {}

    url = Constants.URL;

    public getJsonData() {
        this.http.get(this.url + '/assets/data.json')
            .subscribe(response => {
                console.log(response.json())
            });
    }

    public getMarkers() {
        this.http.get(this.url + '/assets/data.json')
            .subscribe(response => {
                return response.json().markers;
            });
    }
}