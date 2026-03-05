export interface BaseEntity {
  id: string
}

export class Student implements BaseEntity {
  id: string
  name: string
  email: string
  createdDate: Date
  updatedDate: Date

  constructor({
    id,
    name,
    email,
    createdDate,
    updatedDate
  }: {
    id: string
    name: string
    email: string
    createdDate: Date
    updatedDate: Date
  }) {
    this.id = id
    this.name = name
    this.email = email
    this.createdDate = createdDate
    this.updatedDate = updatedDate
  }

  copyWith(data: Partial<Student>): Student {
    return new Student({
      id: data.id ?? this.id,
      name: data.name ?? this.name,
      email: data.email ?? this.email,
      createdDate: data.createdDate ?? this.createdDate,
      updatedDate: data.updatedDate ?? this.updatedDate
    })
  }

  equals(other: Student): boolean {
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.email === other.email &&
      this.createdDate.getTime() === other.createdDate.getTime() &&
      this.updatedDate.getTime() === other.updatedDate.getTime()
    )
  }

  static fromJson(json: any): Student {
    return new Student({
      id: json.id,
      name: json.name,
      email: json.email,
      createdDate: new Date(json.createdDate),
      updatedDate: new Date(json.updatedDate)
    })
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdDate: this.createdDate.toISOString(),
      updatedDate: this.updatedDate.toISOString()
    }
  }
}