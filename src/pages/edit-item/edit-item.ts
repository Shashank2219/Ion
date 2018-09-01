import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  data = { rowid: 0, date: "", type: "", description: "", amount: 0 };

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite,
    private toastcntrl: ToastController) {
    this.getCurrentData(navParams.get("rowid"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditItemPage');
  }
  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM expense WHERE rowid=?', [rowid])
        .then(res => {
          if (res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.date = res.rows.item(0).date;
            this.data.type = res.rows.item(0).type;
            this.data.description = res.rows.item(0).description;
            this.data.amount = res.rows.item(0).amount;
          }
        })
        .catch(e => {
          console.log(e);
          const toast = this.toastcntrl.create({
            message: e,
            duration: 3000
          });
          toast.present();
          
        });
    }).catch(e => {
      console.log(e);
      const toast = this.toastcntrl.create({
        message: e,
        duration: 3000
      });
      toast.present();
    });
  }

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE expense SET date=?,type=?,description=?,amount=? WHERE rowid=?', [this.data.date, this.data.type, this.data.description, this.data.amount, this.data.rowid])
        .then(res => {
          console.log(res);
          const toast = this.toastcntrl.create({
            message: res,
            duration: 3000
          });
          this.navCtrl.popToRoot();
          toast.present();
          
        })
        .catch(e => {
          console.log(e);
          const toast = this.toastcntrl.create({
            message: e,
            duration: 3000
          });
        });
    }).catch(e => {
      console.log(e);
      const toast = this.toastcntrl.create({
        message: e,
        duration: 3000
      });
    });
  }
}