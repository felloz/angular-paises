import { Component, Input, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Paises, ErrorPais } from '../../interfaces/Paises.interface';

@Component({
    selector: 'app-by-country',
    templateUrl: './by-country.component.html',
    styleUrls: ['./by-country.component.css']
})
export class ByCountryComponent implements OnInit {
    private termino: string = '';
    private resultado: Paises[] = [];
    private error: ErrorPais = {
        status: 0,
        message: ''
    };
    public tooltipResp: Paises[] = [];

    constructor(private service: PaisService) {}

    ngOnInit(): void {}

    public buscar(): void {
        if (this.termino.trim()) {
            //this.service.buscarPais(this.termino);
            this.service.buscarPais(this.termino).subscribe(
                //resp tambien puede llarse paises
                (resp) => {
                    this.resultado = resp;
                    this.error.status = 202;
                    this.termino = '';
                },
                (err: ErrorPais) => {
                    this.error = err;
                    this.resultado = [];
                }
            );

            //this.termino = '';
        }
    }

    get countries(): Paises[] {
        return this.resultado;
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

    public setTermino(v: string): void {
        this.termino = v;
        this.tooltipResp = [];
        this.buscar();
    }

    get getTermino(): string {
        return this.termino;
    }

    get errorMessage(): any {
        return this.error.message;
    }

    public tooltips(event: string) {
        console.log('se ejecuta el tool');
        this.service.buscarPais(event).subscribe((resp) => {
            this.tooltipResp = resp.splice(0, 5);
            console.log(this.tooltipResp);
        });
    }
}
