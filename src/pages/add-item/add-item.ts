import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  data = { date: "", type: "", description: "", amount: 0 };
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private toastcntrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }
  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?)', [this.data.date, this.data.type, this.data.description, this.data.amount])
        .then(res => {
          console.log(res);
          const toast = this.toastcntrl.create({
            message: "Data saved",
            duration: 3000
          });
          toast.present();
          this.navCtrl.popToRoot();
        })
        .catch(e => {
          console.log(e);
          const toast = this.toastcntrl.create({
            message: "Data saved",
            duration: 3000
          });
          toast.present();
        });
    }).catch(e => {
      console.log(e);
      const toast = this.toastcntrl.create({
        message: "Data saved",
        duration: 3000
      });
      toast.present();
    });
  }

}
