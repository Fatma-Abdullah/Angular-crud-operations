import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/Classes/product';
import { ProductService } from 'src/app/Services/product.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements AfterViewInit {
  // products:Product[]=[];
  public products: any = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'Action'];
  // filterResult: any;

  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  message:string='';

  subscription: any;

  constructor(private productServ: ProductService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog , private toastr: ToastrService) {}

  ngOnInit() {
    // this.subscription = this.productServ.currentMessage.subscribe(message => this.message = message)
    this.subscription = this.productServ.currentProducts.subscribe(products=> 
      {this.products=products})

    
      this.productServ.getProducts().subscribe(
        res => {
          this.products = res;
         this.setDataSource();
        })
        this.dataSource = new MatTableDataSource(this.products);
      
    console.log(this.products+'pp')
    console.log(this.dataSource+'ss')
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
setDataSource(){
  this.dataSource = new MatTableDataSource(this.products);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
  
  ngAfterViewInit() {
    console.log(this.productServ.products + 'llll')

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    console.log(this.products.length)

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // applyFilter(elem: any) {
  //   console.log(elem.value)
  //    this.products=this.products.includes(elem.value)
  //    console.log(this.products)
  // }

  getAllProducts() {
    this.productServ.getProducts().subscribe(
      res => {
        this.products = res;
        this.dataSource= new MatTableDataSource(this.products);
      }
    )
  }

  editProduct(id: number, item: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: item,
    });
  }

  deleteProduct(id: number) {
    console.log(id);
    let index = this.productServ.products.findIndex(item => item.id === id)
    this.productServ.deleteProduct(id).subscribe(
      res => { this.productServ.products.splice(index, 1)
         this.getAllProducts();
      //  this.setDataSource();

    })
  
      this.toastr.error("Product deleted successfully!")

      }
    //  this.products=this.productServ.products;

    openDialog() {
      this.dialog.open(DialogComponent, {
        width: '30%',
        data: '',
      });
    }
  
}
