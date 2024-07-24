export interface User {
    Id?:number,
    Name:string,
    Age:number,
    Photo:string,
    Document_Type:string,
    Document_Number:string,
    Registration_Date:Date,
}

export interface SignupFields{
    name:string,
    email:string,
    birthdate:Date,
    documentType:string,
    documentNumber:string,
    password:string,
    Photo?:string
}