import { Component } from '@angular/core';
import { AddUserDialogComponent } from '../../pages/add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(public dialog: MatDialog) {}
    openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
