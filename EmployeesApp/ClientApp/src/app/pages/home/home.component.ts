import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, Subscription } from 'rxjs';
import Employee from '../../models/employee';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { DialogComponent } from '../../common/dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  displayedColumns: string[] = ['name', 'jobTitle', 'emplDate', 'rate', 'action'];
  dataSource: Employee[];
  subscription: Subscription;
  loading = true;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.subscription = this.api.subscribeOnChanges().subscribe((data) => {this.dataSource = data; this.loading = false;});
    this.api.getEmployees();
    
  }

  deleteEmployee(id: number) {
    this.confirmDelete().subscribe(result => {
      if(result) this.api.deleteEmployee(id).subscribe(()=>this.api.getEmployees());
    })
    
  }

  confirmDelete(): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: 'Are you sure?', content: 'Are you sure you want to delete this employee?', hasDecideButtons: true}
    });

    return dialogRef.afterClosed();
  }

}
