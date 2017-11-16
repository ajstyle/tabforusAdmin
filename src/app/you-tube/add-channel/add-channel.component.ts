import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddChannelComponent implements OnInit {
form:FormGroup;
  constructor(public dialogRef: MatDialogRef<AddChannelComponent>) { }

  ngOnInit() {
  this.form = new FormGroup({
 ChannelName : new FormControl('', [Validators.required , Validators.minLength(3) ]),
 ChannelId : new FormControl('', [Validators.required, Validators.minLength(24)  ])
 })
  }
  onCancel(){
    this.dialogRef.close();
  }
  save(){
   this.dialogRef.close(this.form.value);
  }

   getChannelErrorMessage() {
if(!this.form.controls["ChannelName"].touched)
  return false;
else
return this.form.get('ChannelName').hasError('required') ? 'Please Enter Channel Id' :
       this.form.get('ChannelName').hasError('minlength') ? 'Channel Name too sort' : ''

  }
 getChannelIdErrorMessage() {
return this.form.get('ChannelId').hasError('required') ? 'Please Enter Channel Name' :
       this.form.get('ChannelId').hasError('minlength') ? 'Not a vaild Channel ID' :''
}

}
