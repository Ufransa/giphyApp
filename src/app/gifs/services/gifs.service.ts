import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '1iYNiH3QNUC5y9PR2rbm2LK4VSqGNo2C'
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs'
  private _historial: string[] = []

  public resultados: Gif[] = []

  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {

    /* Mostrar ultimasd busquedas y ultimo resultado en pantalla */
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []

    this.resultados = JSON.parse(localStorage.getItem('resultados')!)

  }

  buscarGifs(query: string = '') {

    /* Lo almacenamos siempre en minusculas */
    query = query.trim().toLocaleLowerCase()

    /* Evitar añadir espacios vacíos */
    if (query.trim().length === 0) { return }

    /* Evitar duplicar palabras */
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)

      /* Evitar almacenar más de 10 palabras */
      this._historial = this._historial.splice(0, 10)

      /* Grabar busqueda en local storage */
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '50')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data

        /* Mantrener ultimos resultados en pantalla */
        localStorage.setItem('resultados', JSON.stringify(this.resultados))

      })
  }


}
