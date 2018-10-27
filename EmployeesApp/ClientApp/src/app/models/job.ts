import Employee from "./employee";

export default class Job {
  id: number;
  title: string;
  employeeJobs: Array<EmployeeJob>;
}

export class EmployeeJob {
  jobId: number;
  job: Job;
  employeeId: number;
  employee: Employee;
}
