import { Component, Input, OnInit } from '@angular/core';
import { Paises } from '../../interfaces/Paises.interface';

@Component({
    selector: 'app-country-table',
    templateUrl: './country-table.component.html',
    styleUrls: ['./country-table.component.css']
})
export class CountryTableComponent implements OnInit {
    @Input() countries: Paises[] = [];

    constructor() {}

    ngOnInit(): void {}
}
