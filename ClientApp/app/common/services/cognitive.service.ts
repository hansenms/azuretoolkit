import { Injectable,Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AzureHttpClient } from './azureHttpClient';
import { BingSearchResponse } from '../models/bingSearchResponse';
import { ComputerVisionRequest, ComputerVisionResponse } from '../models/computerVisionResponse';
import { AzureToolkitService } from './azureToolkit.service';


@Injectable()
export class CognitiveService {
    private bingSearchAPIKey: string;
    private computerVisionAPIKey: string;

    constructor(private http: AzureHttpClient, private tkservice: AzureToolkitService) {
        this.tkservice.getBingSearchAPIKey().subscribe(key => this.bingSearchAPIKey = key);
        this.tkservice.getComputerVisionAPIKey().subscribe(key => this.computerVisionAPIKey = key);
    }

    searchImages(searchTerm: string): Observable<BingSearchResponse> {
        console.log(`BING KEY: ${this.bingSearchAPIKey}`);
        return this.http.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${searchTerm}`, this.bingSearchAPIKey)
            .map(response => response.json() as BingSearchResponse)
            .catch(this.handleError);
    }

    analyzeImage(request: ComputerVisionRequest): Observable<ComputerVisionResponse> {
        console.log(`VISION KEY: ${this.computerVisionAPIKey}`);
        return this.http.post('https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags,Faces', this.computerVisionAPIKey, request)
            .map(response => response.json() as ComputerVisionResponse)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}