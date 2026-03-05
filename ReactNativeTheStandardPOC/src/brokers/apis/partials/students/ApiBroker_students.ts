import { Student } from "@/models/foundations/students/student"
import { ApiBroker } from "../../ApiBroker"
import { IApiBrokerStudents } from "./IApiBroker_students"

export class ApiBrokerStudents
    extends ApiBroker
    implements IApiBrokerStudents {
    private relativeUrl = "/trending/movie/day"

    async getAllStudentsAsync(): Promise<Student[]> {
        return this.getAsync<Student[]>(
            this.relativeUrl
        )
    }
}