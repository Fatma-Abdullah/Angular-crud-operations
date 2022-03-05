import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../Classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  product: Product = new Product(0,'',0,'','');

  apiUrl: string = 'http://localhost:3000/products/';
  constructor(private http: HttpClient) { }
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
 
  productsSource=new BehaviorSubject(this.products);
  currentProducts=this.productsSource.asObservable()


  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  
  changeProducts(products: Product[]) {
    this.productsSource.next(products)
  }



  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(item: any) {
    return this.http.post(this.apiUrl, item)
  }
  editProduct(id: number, item: any) {
    debugger
    return this.http.put(this.apiUrl + id, item)
  }
  deleteProduct(id: any) {
    return this.http.delete(this.apiUrl + id);
    //return this.products;
  }
  FillProducts()
  {
    this.getProducts().subscribe(res=>{
      this.products=res;
    })
  }
}
