import { Student } from "@/models/foundations/students/student"

export interface IApiBrokerStudents {
    getAllStudentsAsync(): Promise<Student[]>
}