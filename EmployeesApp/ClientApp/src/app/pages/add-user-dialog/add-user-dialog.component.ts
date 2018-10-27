import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import Employee from '../../models/employee';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import Job, { EmployeeJob } from '../../models/job';
import { FormControl, Validators } from '@angular/forms';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { debug } from 'util';

@Component({
  selector: 'add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
})
export class AddUserDialogComponent implements OnInit{
  date = new FormControl(new Date());
  maxDate = new Date();
  serializedDate = new FormControl((new Date()).toISOString());
  jobs: Observable<Job[]>;
  loading = true;
  newEmployee = new Employee();

  firstNameFormControl = new FormControl(this.newEmployee.firstName, [
    Validators.required,
    Validators.pattern(new RegExp('^[a-zA-Z]+$')),
  ]);
  lastNameFormControl = new FormControl(this.newEmployee.lastName, [
    Validators.required,
    Validators.pattern(new RegExp('^[a-zA-Z]+$')),
  ]);
  jobFormControl = new FormControl('', [
    Validators.required,
  ]);

  

  constructor(private api: ApiService, public dialogRef: MatDialogRef<AddUserDialogComponent>, public dialog: MatDialog) {}

  ngOnInit() {
    this.jobs = this.api.getJobs();
    this.newEmployee.rate = 1;
    this.dialogRef.disableClose = true;
    this.loading = false;
  }
  onNoClick(): void {
    this.dialogRef.disableClose = false;
    this.dialogRef.close();
  }

  addEmployee() {
    if(this.firstNameFormControl.pristine) this.firstNameFormControl.markAsTouched();
    if(this.lastNameFormControl.pristine) this.lastNameFormControl.markAsTouched();
    if(this.jobFormControl.pristine) this.jobFormControl.markAsTouched();
    if (this.firstNameFormControl.invalid || this.lastNameFormControl.invalid || this.jobFormControl.invalid) {

    }
    else {
      this.newEmployee.firstName = this.firstNameFormControl.value;
      this.newEmployee.lastName = this.lastNameFormControl.value;
      this.newEmployee.id = 0;
      this.newEmployee.employeeJobs = new Array<EmployeeJob>();
      if (this.jobFormControl.value) {
        
        this.jobFormControl.value.forEach(el => {
          let eJ = new EmployeeJob();
          eJ.job=el; eJ.jobId =0;
          eJ.job.employeeJobs=null; eJ.job.id=0;
          this.newEmployee.employeeJobs.push(eJ);
        });
      }
      this.newEmployee.employmentDate = this.date.value;
      this.api.addEmployee(this.newEmployee).subscribe(() => {
        this.api.getEmployees();
        this.dialogRef.disableClose = false;
        this.dialogRef.close();
      }, (error) => {
        this.showMessage('Sorry but...', error.error).subscribe();
      });
    }
  }

  showMessage(title: string, content: string, hasDecideButtons: boolean = false): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: title, content: content, hasDecideButtons: hasDecideButtons}
    });

    return dialogRef.afterClosed();
  }

}
