export class Product {
        id:number;
        title:string;
        price:number;
        description:string;
        category:string;

        constructor(private _id:number, private _title:string, private _price:number, private _description:string,private _category:string ){
            this.id=_id;
            this.title=_title;
            this.price=_price;
            this.description=_description;
            this.category=_category;
        }
}
