import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GeoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoProvider {
  private endpoint: string;

  constructor(public http: HttpClient) {
    this.endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?'
  }

  public getLocationName(lat: number, long: number) {
    let params = `latlng=${lat},${long}&key=AIzaSyAPbnlhnWFRIBKbPx8iLFcUD0PDoGc4KCY`
    return this.http.get(this.endpoint + params);
  }

}
