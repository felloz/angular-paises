import { Component, Input, OnInit } from '@angular/core';
import { ErrorPais, Paises } from '../../interfaces/Paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
    selector: 'app-by-capital',
    templateUrl: './by-capital.component.html',
    styleUrls: ['./by-capital.component.css']
})
export class ByCapitalComponent implements OnInit {
    public terminus: string = '';
    private results: Paises[] = [];
    public error: ErrorPais = {
        status: 0,
        message: ''
    };

    constructor(private service: PaisService) {}

    ngOnInit(): void {}

    public search(): void {
        if (this.terminus.trim()) {
            this.service.searchCapital(this.terminus).subscribe(
                //resp tambien puede llarse paises
                (resp) => {
                    this.results = resp;
                    this.error.status = 201;
                    this.terminus = '';
                    console.log(this.results);
                },
                (err: ErrorPais) => {
                    this.error = err;
                    this.results = [];
                }
            );
        }
    }

    public setTerminus(v: string): void {
        this.terminus = v;
        this.search();
    }

    get capitals(): Paises[] {
        return this.results;
    }

    public isEmpty(): boolean {
        if (
            this.error.status == 0 ||
            (this.error.status >= 200 && this.error.status <= 299)
        ) {
            return false;
        }

        return true;
    }
}
