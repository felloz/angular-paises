import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ErrorPais,
    Paises,
    Translations
} from '../../interfaces/Paises.interface';
import { PaisService } from '../../services/pais.service';
import { switchMap } from 'rxjs/operators';
import { removeDuplicates } from 'src/app/functions/functions';

@Component({
    selector: 'app-see-country',
    templateUrl: './see-country.component.html',
    styleUrls: ['./see-country.component.css']
})
export class SeeCountryComponent implements OnInit {
    public country!: Paises;
    public gotError: boolean = false;
    public translations!: Translations;

    constructor(
        private countryService: PaisService, //
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                switchMap((params) =>
                    this.countryService.searchOneCountry(params.id)
                )
            )
            .subscribe(
                (resp) => {
                    this.country = resp;
                    this.translations = resp.translations;
                    //console.log(this.translations);
                },
                (err: ErrorPais) => {
                    this.gotError = true;
                }
            );

        // this.activatedRoute.params.subscribe(({ id }) => {
        //     console.log(id);

        //     this.countryService.searchOneCountry(id).subscribe((resp) => {
        //         console.log(resp);
        //         this.country = resp;
        //     });
        // });
    }

    get getTranslations(): string[] {
        const result = Object.values(this.translations);
        return removeDuplicates(result);
    }
}
