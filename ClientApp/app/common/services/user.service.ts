import { Injectable, InjectionToken, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User, AADUser } from "../models/user";
import { Headers,Http } from "@angular/http";

@Injectable()
export class UserService {

    private originUrl: string;
    private aadUser: AADUser;

    /*
    constructor(private http: Http, @Inject('ORIGIN_URL')originUrl: string) {
        this.originUrl = originUrl;
    }*/

    constructor(private http: Http) {
        this.originUrl = "https://mihansenazuretoolkit.azurewebsites.net";
    }

    public getUser(): Observable<User> {

        return this.http.get(`${this.originUrl}/.auth/me`)
        //return this.http.get("https://www.google.com")
            .map(response => {
                try {
                    //this.aadUser = response.json()[0] as AADUser;
   
                    let user = new User();
                    //user.userId = this.aadUser.user_id;
                    user.userId = "BLAHBLAH"
                    /*
                    this.aadUser.user_claims.forEach(claim => {
                        switch (claim.typ) {
                            case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname":
                                user.firstName = claim.val;
                                break;
                            case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname":
                                user.lastName = claim.val;
                                break;
                        }
                    });
                    */
                    return user;
                }
                catch (Exception) {
                    console.log(`Error: ${Exception}`);
                }
            }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}