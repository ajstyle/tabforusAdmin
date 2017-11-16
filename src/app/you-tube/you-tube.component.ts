
import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material';
import { ChannelListInterface } from '../channel-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MatSnackBar } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';



@Component({
  selector: 'app-you-tube',
  templateUrl: './you-tube.component.html',
  styleUrls: ['./you-tube.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class YouTubeComponent implements OnInit {

  channelList;
  dataSource;
  data;
  value;
  form;
  show: boolean = false;


  /* ----------------------- Validation of Update Field ---------------------*/
  channelIdControl = new FormControl('', [
    Validators.required,
    Validators.minLength(24),
    Validators.maxLength(24),
  ]);
  ChannelNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)

  ]);
  matcher = new MyErrorStateMatcher();




  /* ----------------------- Table Coloumns ---------------------*/

  displayedColumns = ['S.no.', 'channelName', 'channelId', 'Action'];

  constructor(public dialog: MatDialog, private ApiService: ApiService, public snackBar: MatSnackBar) {

  }

  /* ----------------------- GEt Channel ---------------------*/

  ngOnInit() {
    this.show = true;
    this.ApiService.getChannel().subscribe((channelList) => {
      this.channelList = channelList
      console.log(this.channelList);
      this.dataSource = new MatTableDataSource<ChannelListInterface>(this.channelList);
      this.show = false;
    });

  }

  /* ----------------------- Save Channel ---------------------*/
  save(channel) {

    this.show = true;

    this.ApiService.saveChannel(channel).subscribe((data) => {

      this.data = data
      this.channelList.push(this.data.result);
      console.log(this.channelList);

      this.dataSource = new MatTableDataSource<ChannelListInterface>(this.channelList);
      console.log(this.form);
      this.show = false

      this.snackBar.open('Channel Added', '', {
        duration: 2000
      });
    })
  }


  /************ Update Channel ****************/

  update(id, channelname, channelId) {
    this.show = true;
    this.value = {};
    console.log(channelId);
    this.value.ChannelName = channelname;
    this.value.ChannelId = channelId;

    this.ApiService.update(id, this.value).subscribe(() => {


      this.dataSource = new MatTableDataSource<ChannelListInterface>(this.channelList);
      this.show = false;
      this.snackBar.open('Channel Update', '', {
        duration: 2000
      });
    })
  }


  /************ Delete Channel ****************/
  delete(id) {
    this.show = true;
    this.ApiService.delete(id).subscribe(() => {
      console.log("delete " + id);
      this.channelList = this.channelList.filter((channel) => { return channel._id != id });
      console.log(this.channelList);
      this.dataSource = new MatTableDataSource<ChannelListInterface>(this.channelList);
      this.show = false;
      this.snackBar.open('Channel Delete', '', {
        duration: 2000
      });
    })
  }

  /************ Add Channel Dialog Box****************/

  addChannel() {
    let dialogRef = this.dialog.open(AddChannelComponent, {});
    dialogRef.afterClosed().subscribe(channel => {
      console.log('The dialog was closed');
      if (channel) {
        console.log(channel);
        this.save(channel);
      }
    });
  }

}

/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


