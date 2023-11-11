import { EmployeePayload } from "../API/payload/employeePayload";
import { JobDetailsPayload } from "../API/payload/jobDetailsPayload";
import { salaryDetailsPayload } from "../API/payload/salaryDetailsPayload";
import { UserPayload } from "../API/payload/userPayload";
import GenericHelper from "../helpers/genericFunctions";
import { jobId, LocationId } from "../helpers/reportApisHelper";

export const firstName: string = "ali";
export const lastName: string = "ali";
export const empId: any = `${GenericHelper.genericRandomString()}`;
export const salaryAmount: string = "255";
export const salaryComponent: string = "500";
export const username: string = `sali${GenericHelper.genericRandomString()}`;
export const password: string = "123456789r";
export default class CandidateInit {
  static initEmployee(): EmployeePayload {
    return {
      empPicture: null,

      employeeId: empId,

      firstName: firstName,

      lastName: lastName,

      middleName: "",
    };
  }
  static initUser(empNum: number): UserPayload {
    return {
      empNumber: empNum,

      password: password,

      status: true,

      userRoleId: 2,

      username: username,
    };
  }
  static initJobDetails(): JobDetailsPayload {
    return {
      jobTitleId: jobId,
      joinedDate: null,
      locationId: LocationId,
    };
  }
  static initSalaryDetails(): salaryDetailsPayload {
    return {
      addDirectDeposit: false,
      comment: null,
      currencyId: "CAD",
      salaryAmount: salaryAmount,
      salaryComponent: salaryComponent,
    };
  }
}
