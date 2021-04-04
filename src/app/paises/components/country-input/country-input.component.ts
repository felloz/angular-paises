import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Paises } from '../../interfaces/Paises.interface';

@Component({
    selector: 'app-country-input',
    templateUrl: './country-input.component.html',
    styleUrls: ['./country-input.component.css']
})
export class CountryInputComponent implements OnInit {
    public termino: string = '';

    @Output() onEnterLuis: EventEmitter<string> = new EventEmitter();
    @Output() onDebounceLuis: EventEmitter<string> = new EventEmitter();
    @Input() placeholder: string = '';
    @Input() tooltips: Paises[] = [];
    @Output() onClickLuis: EventEmitter<string> = new EventEmitter();

    /**
     * Metodo que permitira inicializar el subject para realizar una busqueda
     * cada vez que el usuario presione una tecla
     */
    public debounce: Subject<string> = new Subject();

    constructor() {}

    ngOnInit(): void {
        this.debounce
            .pipe(
                //El debeounceTime ayuda a controlar cada cuanto
                //se debe ejecutar una porción del codigo
                debounceTime(300)
            )
            .subscribe((value) => {
                this.onDebounceLuis.emit(value);
            });
    }

    public search() {
        this.onEnterLuis.emit(this.termino);
    }

    public searchOnClick(name: string): void {
        this.onClickLuis.emit(name);
        this.tooltips = [];
    }

    /**
     * Este metodo es clave para poder llenar el debounce con el termino de busqueda
     * el termino se llena con ngModel
     */
    public keyPressed() {
        this.debounce.next(this.termino);
    }
}
