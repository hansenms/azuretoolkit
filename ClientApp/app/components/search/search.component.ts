import { Component } from '@angular/core';
import { CognitiveService } from '../../common/services/cognitive.service';
import { ImageResult } from '../../common/models/bingSearchResponse';
import { ComputerVisionRequest, ComputerVisionResponse } from '../../common/models/computerVisionResponse';
import { AzureToolkitService } from '../../common/services/azureToolkit.service';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    searchResults: ImageResult[] | null;
    isSearching = false;
    currentAnalytics: ComputerVisionResponse | null;
    currentItem: ImageResult | null;
    isAnalyzing = false;
    currentItemSaved: boolean;

    constructor(private cognitiveService: CognitiveService, private azureToolkitService: AzureToolkitService) { }

    search(searchTerm: string) {
        this.searchResults = null;
        this.currentAnalytics = null;
        this.isSearching = true;
        this.cognitiveService.searchImages(searchTerm).subscribe(result => {
            this.searchResults = result.value;
            this.isSearching = false;
        });
    }

    analyze(result: ImageResult) {
        this.currentItem = result;
        this.currentAnalytics = null;
        this.isAnalyzing = true;
        this.currentItemSaved = false;
        this.cognitiveService.analyzeImage({ url: result.thumbnailUrl } as ComputerVisionRequest).subscribe(result => {
            this.currentAnalytics = result;
            this.isAnalyzing = false;
        });
        window.scroll(0, 0);
    }

    saveImage() {
        if (this.currentItem !== null) {
            let transferObject = {
                url: this.currentItem.thumbnailUrl,
                encodingFormat: this.currentItem.encodingFormat,
                id: this.currentItem.imageId
            }
                this.azureToolkitService.saveImage(transferObject).subscribe(saveSuccessful => {
                this.currentItemSaved = saveSuccessful;
            });
        }
    }
}