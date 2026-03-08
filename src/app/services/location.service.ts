import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private cityMap: { [key: string]: string[] } = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
  };

  getStates(): string[] {
    return Object.keys(this.cityMap);
  }

  getCities(state: string): string[] {
    return this.cityMap[state] || [];
  }
}