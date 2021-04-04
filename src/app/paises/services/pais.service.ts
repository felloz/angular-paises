import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Paises } from '../interfaces/Paises.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaisService {
    private apiURL: string = 'https://restcountries.eu/rest/v2';
    public results: Paises[] = [];
    private fields: string =
        '?fields=name;flag;numericCode;population;alpha2Code';
    private params: HttpParams = new HttpParams().set(
        'fields',
        'name;flag;numericCode;population;alpha2Code'
    );

    constructor(private paisHttp: HttpClient) {}

    public buscarPais(name: string): Observable<Paises[]> {
        const fullUrl = `${this.apiURL}/name/${name}`;

        return this.paisHttp.get<Paises[]>(fullUrl, {
            params: this.params
        });
    }

    public searchCapital(name: string): Observable<Paises[]> {
        const fullUrl = `${this.apiURL}/capital/${name}${this.fields}`;

        return this.paisHttp.get<Paises[]>(fullUrl);
    }

    public searchOneCountry(code: string): Observable<Paises> {
        const fullUrl = `${this.apiURL}/alpha/${code}`;

        return this.paisHttp.get<Paises>(fullUrl);
    }

    public searchByRegion(region: string): Observable<Paises[]> {
        const fullUrl = `${this.apiURL}/region/${region}${this.fields}`;

        return this.paisHttp.get<Paises[]>(fullUrl);
    }
}
