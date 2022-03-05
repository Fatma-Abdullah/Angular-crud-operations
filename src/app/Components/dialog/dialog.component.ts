import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Classes/product';
import { ProductService } from 'src/app/Services/product.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {

  newProduct: Product = new Product(0, '', 0, '', '');
  // message = 'Hola Mundo!';

  message: string = '';
  // subscription: Subscription;
  subscription: any;
  products: Product[] = [];
  checkId: Number = 0;
  constructor(private productServ: ProductService, @Inject(MAT_DIALOG_DATA) public data: Product  ,  private dialogRef: MatDialogRef<DialogComponent> , private toastr: ToastrService) {
    this.newProduct = data;
    console.log(data + 'dd')
  }

  ngOnInit() {
    this.subscription = this.productServ.currentMessage.subscribe(message => this.message = message)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  FormSubmit(productAdded: Product) {
    debugger
    // if (productAdded.id != 0) {
    this.checkId = this.productServ.products.findIndex(item => item.id === productAdded.id);
    console.log(this.checkId + 'id')

    //add
    if (this.checkId == -1) {
      this.productServ.addProduct(productAdded).subscribe(
        (item: any) => { this.productServ.products.push(item) });
      this.productServ.FillProducts();
      this.dialogRef.close();
      this.toastr.success("Product added successfully!")
    }

    //edit
    else {
      this.productServ.editProduct(productAdded.id, productAdded).subscribe(
        res => this.products = this.productServ.products
      )
      this.dialogRef.close();
      this.toastr.info("Product edited successfully!")
    }

  }

}
