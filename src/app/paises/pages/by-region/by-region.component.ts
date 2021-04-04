import { Component, OnInit } from '@angular/core';
import { ErrorPais, Paises } from '../../interfaces/Paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
    selector: 'app-by-region',
    templateUrl: './by-region.component.html',
    styleUrls: ['./by-region.component.css']
})
export class ByRegionComponent implements OnInit {
    private _regions: Paises[] = [];
    public regions: string[] = [
        'africa',
        'americas',
        'europe',
        'asia',
        'oceania'
    ];

    public activeRegion: string = '';
    private _terminus: string = '';
    public error: ErrorPais = {
        status: 201,
        message: ''
    };
    constructor(private countryService: PaisService) {}

    ngOnInit(): void {}

    public search(): void {
        this.countryService.searchByRegion(this._terminus).subscribe((resp) => {
            this._regions = resp;
        });
    }

    public setTerminus(v: string) {
        this._terminus = v;
        this.search();
        this.activeRegion = v;
    }

    get countries(): Paises[] {
        return this._regions;
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

    public style(region: string): string {
        if (region == this.activeRegion) {
            return 'btn btn-primary';
        }
        return 'btn btn-outline-primary';
    }
}
