import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../interfaces/Product.Interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [],
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


limite: string = '';
maxProduct: number = 0;
cadena: string = '';
order: string = '';
categoria: string = '';
botonSeleccionado1: boolean = false;
botonSeleccionado2: boolean = false;

////////////////metodos para extraer valor de cadena para la api
  extraerValorLimit(valorInput: string): void {
    this.limite = valorInput;
  }

  obtenerSeleccion(valorSelect: string): void {
    this.categoria = valorSelect;
  }

  toggleSeleccionAsc() {
    if(this.botonSeleccionado1 == false) {
      this.order="asc";
      this.botonSeleccionado1 = true;
      this.botonSeleccionado2 = false;
    }
  }

  toggleSeleccionDesc() {
    if(this.botonSeleccionado2 == false) {
      this.order="desc";
      this.botonSeleccionado2 = true;
      this.botonSeleccionado1 = false;
    }
  }

  product_list: ProductInterface [] = [];
  categories_list: any = [];

  constructor(private prodService:ProductService){}

  ngOnInit(): void {
    this.Get_Products();
    this.Get_Categories();
  }

  Get_Products(){
    this.prodService.Get_Products().subscribe({
      next: (result) => {
        this.maxProduct= result.length
        this.product_list = result
        console.log(this.product_list);
      },error: (err) => {
        console.log(err)
      }
    });
  }

  OrderByPriceAsc(){
    this.product_list.sort((a, b) => {
      return a.price - b.price;
    });
  }

  OrderByPriceDesc(){
    this.product_list.sort((a, b) => {
      return a.price - b.price;
    }).reverse();
  }

  OrderByAlphabetAsc(){
    this.product_list.sort((a, b) => { 
      if (a.title < b.title) {
          return -1; 
      } else if (a.title > b.title) {
          return 1; 
      } else {
          return 0; 
      }
    });
  }

  OrderByAlphabetDesc(){
    this.product_list.sort((a, b) => { 
      if (a.title < b.title) {
          return -1; 
      } else if (a.title > b.title) {
          return 1; 
      } else {
          return 0; 
      }
    }).reverse();
  }

  Get_ProductsCondition(numeroLimit : string){

    this.extraerValorLimit(numeroLimit);

    if(this.categoria != '' && this.categoria != "Select opcion"){
      this.cadena = "/category/"+this.categoria;
    }

    if(this.order != ''){
      this.cadena = this.cadena+"?sort="+this.order
    }

    if(this.limite != ''){
      if(this.order != ''){
        this.cadena = this.cadena+"&limit="+this.limite
      }else{
        this.cadena = this.cadena+"?limit="+this.limite
      }
    }

    console.log(this.cadena)

    this.prodService.Get_ProductsCondition(this.cadena).subscribe({
      next: (result) => {
        this.product_list = result
        this.cadena = "";
      },error: (err) => {
        console.log(err)
      }
    });
  }

  Get_Categories(){
    this.prodService.Get_Categories().subscribe({
      next: (result) => {
        this.categories_list = result
        console.log(this.categories_list)
      },error: (err) => {
        console.log(err)
      }
    });
  }

}
