import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mylist1',
  templateUrl: './mylist1.page.html',
  styleUrls: ['./mylist1.page.scss'],
})
export class Mylist1Page implements OnInit {
  productlist : any;
  constructor(public alertCtrl: AlertController) { 

    this.productlist = [
      {id: 1,
        productname: "Perfume",
        price: "1055",
        quantity: "20",
       //icon2: "nutrition",
        icon: "https://img.icons8.com/color/48/perfume-bottle.png",
      },
      {id: 2,
        productname: "Face-Powder",
        price: "355",
        quantity: "50",
        icon: "https://img.icons8.com/color/48/face-powder.png"
      },
      {id: 3,
        productname: "Nail Polish",
        price: "125",
        quantity: "10",
        icon: "https://img.icons8.com/color/48/eye-shadows.png"
      }
    ];

  }

  ngOnInit() {
  }

  async addOrder(item:any) {
    let alert = this.alertCtrl.create({
      header: 'Edit',
      subHeader: 'Fill the form',
      inputs: [
        {
          name: 'inpname',
          placeholder: 'product name',
          value: item.productname
        },
        {
          name: 'inprice',
          placeholder: 'price',
          value: item.price
        },
        {
          type: 'number',
          name: 'inquantity',
          placeholder: 'quantity',
          value: item.quantity
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            //code here when user click update
            console.log("update",this.productlist.length);
            console.log(item);
            for (let i=0; i<this.productlist.length; i++){
              console.log(this.productlist[i]);
              if (this.productlist[i] == item){//found
                console.log("data.inpname",data.inpname, data.inprice, data.inquantity);

                  this.productlist[i].productname = data.inpname;
                  this.productlist[i].price = data.inprice;
                  this.productlist[i].quantity = data.inquantity;
              }
            }

          }//hadler
        }
      ]
    });
    (await alert).present();
  }

  async orderDelete(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteOrder(item);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteOrder(item: any) {
    const index = this.productlist.indexOf(item);
    if (index > -1) {
      this.productlist.splice(index, 1);
    }
  }
}
