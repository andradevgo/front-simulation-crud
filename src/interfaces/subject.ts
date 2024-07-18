export interface Subject {
    Id: number;
    Division: number;
    Name: string;
    Classroom: string;
    Credits: number;
    Registration_Date: string;
    Status: string;
    Slots: number;
    Program_Id: number;
    OriginalSubjectId: number | null;
}
