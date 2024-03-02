import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  Url: string = "https://fakestoreapi.com/products";
  UrlCategories: string= "https://fakestoreapi.com/products/categories";

  constructor(private httpclient: HttpClient) { }

  Get_Products():Observable<any>{
    return this.httpclient.get(this.Url).pipe(res=> res)
  }

  Get_ProductsCondition(order: string):Observable<any>{
    return this.httpclient.get(this.Url+order).pipe(res=> res)
  }
  
  Get_Categories():Observable<any>{
    return this.httpclient.get(this.UrlCategories).pipe(res=> res)
  }
}
