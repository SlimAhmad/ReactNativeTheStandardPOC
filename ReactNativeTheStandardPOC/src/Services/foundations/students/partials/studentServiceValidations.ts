import { InvalidStudentException, NullStudentException } from "../../../../models/foundations/students/exceptions/studentExceptions"
import { Student } from "../../../../models/foundations/students/student"

type ValidationRule = {
    condition: boolean
    message: string
}

export class StudentService {

    validateStudent(Student: Student) {
        this.validateStudentIsNotNull(Student)

        this.validate(
            { rule: this.isInvalidId(Student.id), parameter: "id" },
            { rule: this.isInvalidText(Student.name), parameter: "name" },
            { rule: this.isInvalidText(Student.email), parameter: "email" },
            { rule: this.isInvalidDate(Student.createdDate), parameter: "createdDate" },
            { rule: this.isInvalidDate(Student.updatedDate), parameter: "updatedDate" }
        )
    }

    validateStudentId(StudentId: string) {
        this.validate({
            rule: this.isInvalidId(StudentId),
            parameter: "id"
        })
    }

    private validateStudentIsNotNull(Student: Student | null | undefined) {
        if (!Student) {
            throw new NullStudentException("Student is null.")
        }
    }

    private isInvalidId(id: string): ValidationRule {
        return {
            condition: !id || id === "",
            message: "Required"
        }
    }

    private isInvalidText(text: string): ValidationRule {
        return {
            condition: !text || text.trim() === "",
            message: "Required"
        }
    }

    private isInvalidDate(date: Date): ValidationRule {
        return {
            condition: !date,
            message: "Required"
        }
    }

    private validate(...validations: { rule: ValidationRule; parameter: string }[]) {
        const invalidStudentException =
            new InvalidStudentException("Invalid Student exception occured, please fix the errors and try again.")

        for (const validation of validations) {
            if (validation.rule.condition) {
                invalidStudentException.upsertDataList(
                    validation.parameter,
                    validation.rule.message
                )
            }
        }

        invalidStudentException.throwIfContainsErrors()
    }
}