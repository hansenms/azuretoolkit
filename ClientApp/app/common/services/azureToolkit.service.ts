import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ImagePostRequest } from '../models/imagePostRequest';
import { SavedImage } from '../models/savedImage';

@Injectable()
export class AzureToolkitService {
    private originUrl: string;

    constructor(private http: Http, @Inject('BASE_URL')originUrl: string) {
        this.originUrl = originUrl;
    }

    public saveImage(imagePostRequest: ImagePostRequest): Observable<boolean> {
        return this.http.post(`${this.originUrl}api/images`, imagePostRequest)
            .map(response => {
                return response.ok;
            }).catch(this.handleError);
    }


    public getImages(userId: string): Observable<SavedImage[]> {
        return this.http.get(`${this.originUrl}api/images/${userId}`)
            .map(images => {
                return images.json() as SavedImage[];
            }).catch(this.handleError);
    }

    public searchImage(userId: string, searchTerm: string): Observable<SavedImage[]> {
        return this.http.get(`${this.originUrl}api/images/search/${userId}/${searchTerm}`)
            .map(response => {
                return response.json() as SavedImage[];
            }).catch(this.handleError);
    }


    public getBingSearchAPIKey(): Observable<string> {
        return this.http.get(`${this.originUrl}api/config/bingsearchapikey`)
            .map(response => { return response.text() });
    }
    
    public getComputerVisionAPIKey(): Observable<string> {
        return this.http.get(`${this.originUrl}api/config/computervisionapikey`)
            .map(response => { return response.text() });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    
}