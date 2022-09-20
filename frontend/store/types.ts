export interface User {
    displayName: string
    firstName: string
    lastName: string
    picture: string
    email: string
    classRooms: string[]
    students: string[]
    createdTimeStamp: number
}

export interface UpdateUser {
    displayName?: string
    firstName?: string
    lastName?: string
}

export interface ClassRoom {
    id?: string
    name: string
    notes?: string // 140 chars
    createdTimeStamp?: number
    teachers: string[]
    students: string[]
}

export interface UpdateClassRoom {
    id?: string
    name?: string
    notes?: string
}

export interface Student {
    id?: string,
    firstName: string
    lastName: string
    email?: string
    teacher?: string
    createdTimeStamp?: number
    status?: string
}

export interface CreateStudent {
    student: Student
    classRoomIndex: number
}

export interface UpdateStudent {
    firstName?: string
    lastName?: string
}
