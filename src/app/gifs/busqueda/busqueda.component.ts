import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  /* Decorador ->  */
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) { }

  buscar() {

    /* Con esto reflejamos el valor escrito en lña caja de texto */
    const valor = this.txtBuscar.nativeElement.value



    this.gifsService.buscarGifs(valor)

    /* Lo igualamos a un streing vacio */
    this.txtBuscar.nativeElement.value = ''

  }

}
