import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import Employee from '../models/employee';
import Job from '../models/job';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }
  employees: Subject<Employee[]> = new Subject();

  subscribeOnChanges() : Observable<Employee[]> {
    return this.employees.asObservable();
  }

  getEmployees() {
    return this.http.get('api/Employee').subscribe((data:Array<Employee>)=>this.employees.next(data));
  }

  getJobs(): Observable<Job[]>{
    return this.http.get('api/Job') as Observable<Job[]>;
  }

  addEmployee(employee: Employee) {
    return this.http.post('api/Employee', employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete('api/Employee/'+ id);
  }
}
