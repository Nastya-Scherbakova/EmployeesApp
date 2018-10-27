import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import DialogData from '../../models/dialog-data';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit{

  constructor(private api: ApiService, public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
   
  }
  
  }


