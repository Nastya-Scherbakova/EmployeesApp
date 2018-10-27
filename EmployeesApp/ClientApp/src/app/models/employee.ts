import { EmployeeJob } from "./job";


export default class Employee {
  id: number;
  firstName: string;
  lastName: string;
  employeeJobs: Array<EmployeeJob>;
  employmentDate: Date;
  rate: number;
}
