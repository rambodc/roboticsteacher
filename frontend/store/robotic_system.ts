import { GetterTree, ActionTree, MutationTree } from 'vuex'
import axios from 'axios'

import {
  User,
  UpdateUser,
  ClassRoom,
  UpdateClassRoom,
  Student,
  CreateStudent,
  UpdateStudent
} from './types'

export const state = () => ({
  uid: '',
  token: '',
  auth: false,
  teacher: false,
  user: {} as User,
  classRooms: [] as ClassRoom[],
  students: [] as Student[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  classRooms: state => state.classRooms,
  getStudentsFromClassRoom: state => (index: number) =>
    state.students.filter(student => state.classRooms[index].students.includes(student.id as string)),
  isAuth: state => state.auth,
  isTeacher: state => state.teacher,
  user: state => state.user
}

export const mutations: MutationTree<RootState> = {
  SET_UID: (state, uid: string) => (state.uid = uid),
  SET_TOKEN: (state, token: string) => (state.token = token),
  SET_AUTH: (state, auth: boolean) => (state.auth = auth),
  SET_TEACHER: (state, teacher: boolean) => (state.teacher = teacher),
  SET_USER: (state, user: User) => (state.user = user),
  SET_CLASSROOMS: (state, classRooms: ClassRoom[]) => (state.classRooms = classRooms),
  SET_STUDENTS: (state, students: Student[]) => (state.students = students),
  ADD_CLASSROOM: (state, classRoom: ClassRoom) => (state.classRooms = [...state.classRooms, classRoom]),
  ADD_STUDENT: (state, student: Student) => (state.students = [...state.students, student])
}

export const actions: ActionTree<RootState, RootState> = {
  async signUp ({ state }, params: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    if (!state.auth) {
      try {
        await this.$fire.functions.httpsCallable('api.singUp')(params)
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    }
    return true
  },
  async signIn ({ state }, { email, password }) {
    if (!state.auth) {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(email, password)
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    }
    return true
  },
  // eslint-disable-next-line no-empty-pattern
  async resetPassword ({}, email) {
    try {
      await this.$fire.auth.sendPasswordResetEmail(email)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  },
  async changeEmail ({ state }, newEmail) {
    if (state.auth) {
      try {
        await this.$fire.auth.currentUser?.updateEmail(newEmail)
        await this.$fire.auth.currentUser?.sendEmailVerification()
        await this.$fire.firestore.doc(`/users/${state.uid}`).update({
          email: newEmail
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  async onAuthStateChangedAction ({ commit }, { authUser, claims }) {
    if (authUser) {
      const getClassRooms = async (uid: string) =>
        (await this.$fire.firestore.collection('classrooms')
          .where(uid, 'in', 'teachers').get()).docs.map(item => ({ ...item.data(), id: item.id }))
      const getStudents = async (uid: string) =>
        (await this.$fire.firestore.collection('students')
          .where('teacher', '==', uid).get()).docs.map(item => ({ ...item.data(), id: item.id }))
      commit('SET_AUTH', true)
      commit('SET_UID', authUser.uid)
      if (claims.teacher) {
        commit('SET_TEACHER', true)
      } else {
        commit('SET_TEACHER', false)
      }
      commit('SET_TOKEN', await authUser.getIdToken())
      commit('SET_USER', (await this.$fire.firestore.doc(`/users/${authUser.uid}`).get()).data())
      commit('SET_CLASSROOMS', await getClassRooms(authUser.uid))
      commit('SET_STUDENTS', await getStudents(authUser.uid))
    } else {
      commit('SET_AUTH', false)
      commit('SET_TEACHER', false)
      commit('SET_USER', {})
      commit('SET_UID', null)
      commit('SET_TOKEN', null)
      commit('SET_CLASSROOMS', [])
      commit('SET_STUDENTS', [])
    }
  },
  async updatePicture ({ state, commit }, { formData }) {
    try {
      const res = await axios.post(`${process.env.SERVER_URL as string}/updatePicture`, formData, {
        headers: {
          authentification: `Bearer ${state.token}`
        }
      })
      commit('SET_USER', { ...state.user, ...res.data })
    } catch (e) {
      console.log(e)
    }
  },
  async updateUser ({ state, commit }, { displayName, firstName, lastName }: UpdateUser) {
    const updateObject = {} as UpdateUser
    if (firstName && state.user.firstName !== firstName) {
      updateObject.firstName = firstName
    }
    if (lastName && state.user.lastName !== lastName) {
      updateObject.lastName = lastName
    }
    if (displayName && state.user.displayName !== displayName) {
      updateObject.displayName = displayName
    } else if (updateObject.firstName || updateObject.lastName) {
      updateObject.displayName = (updateObject.lastName ?? state.user.lastName).split(' ')[0] +
        ' ' + (updateObject.firstName ?? state.user.firstName).split(' ')[0]
    }

    try {
      await this.$fire.firestore.doc(`/users/${state.uid}`).update(
        updateObject
      )
      commit('SET_USER', { ...state.user, ...updateObject })
    } catch (e) {
      console.log(e)
    }
  },
  async addClassRoom ({ state, commit }, classRoom: ClassRoom) {
    try {
      classRoom.createdTimeStamp = Date.now()
      const classRoomRef = await this.$fire.firestore.collection('classrooms').add(classRoom)
      state.user.classRooms.push(classRoomRef.id)
      await this.$fire.firestore.doc(`/users/${state.uid}`).update({ classRooms: state.user.classRooms })
      commit('ADD_CLASSROOM', classRoom)
      commit('SET_USER', state.user)
    } catch (e) {
      console.log(e)
    }
  },
  async updateClassRoom ({ state, commit }, { id, index, name, notes }) {
    const updateObject : UpdateClassRoom = {}
    if (name) {
      updateObject.name = name
    }
    if (notes) {
      updateObject.notes = notes
    }
    try {
      state.classRooms[index] = {
        ...state.classRooms[index],
        ...updateObject
      }
      const updated = state.classRooms[index]
      delete updated.id
      delete updated.createdTimeStamp
      await this.$fire.firestore.doc(`/classrooms/${id}`).update(
        updated
      )
      commit('SET_CLASSROOMS', updateObject)
    } catch (e) {
      console.log(e)
    }
  },
  async deleteClassRoom ({ state, commit }, { id }) {
    try {
      await this.$fire.firestore.doc(`/classrooms/${id}`).delete()
      state.user.classRooms = state.user.classRooms.filter(item => item !== id)
      await this.$fire.firestore.doc(`/users/${state.uid}`).update({ classRooms: state.user.classRooms })
      commit('SET_CLASSROOMS', state.classRooms.filter(item => item.id !== id))
      commit('SET_USER', state.user)
    } catch (e) {
      console.log(e)
    }
  },
  async createStudent ({ state, commit, dispatch },
    { student, classRoomIndex }: CreateStudent) {
    try {
      const createdStudent = await dispatch('sendInvitationEmail', { student, again: false })
      if (createdStudent) {
        state.classRooms[classRoomIndex].students.push(createdStudent.id)
        await this.$fire.firestore.doc(`/classrooms/${state.classRooms[classRoomIndex].id}`).update({
          students: state.classRooms[classRoomIndex].students
        })
        state.user.students.push(createdStudent.id)
        await this.$fire.firestore.doc(`/users/${state.uid}`).update({ students: state.user.students })
        commit('ADD_STUDENT', createdStudent)
        commit('SET_CLASSROOMS', state.classRooms)
        commit('SET_USER', state.user)
      } else {
        throw new Error('User not created')
      }
    } catch (e) {
      console.log(e)
    }
  },
  async editStudent ({ state, commit },
    { id, index, firstName, lastName }) {
    const updateObject : UpdateStudent = {}
    if (firstName) {
      updateObject.firstName = firstName
    }
    if (lastName) {
      updateObject.lastName = lastName
    }
    try {
      state.students[index] = {
        ...state.students[index],
        ...updateObject
      }
      const updated = state.students[index]
      delete updated.id
      delete updated.createdTimeStamp
      delete updated.email
      delete updated.teacher
      delete updated.status
      await this.$fire.firestore.doc(`/students/${id}`).update(
        updated
      )
      commit('SET_STUDENTS', updateObject)
    } catch (e) {
      console.log(e)
    }
  },
  async deleteStudent ({ state, commit }, { id, classRoomIndex }) {
    try {
      await this.$fire.firestore.doc(`/students/${id}`).delete()
      state.user.students = state.user.students.filter(item => item !== id)
      await this.$fire.firestore.doc(`/users/${state.uid}`).update({ students: state.user.students })
      state.classRooms[classRoomIndex].students =
        state.classRooms[classRoomIndex].students.filter(item => item !== id) ?? []
      commit('SET_STUDENTS', state.students.filter(item => item.id !== id))
      commit('SET_CLASSROOMS', state.classRooms)
      commit('SET_USER', state.user)
    } catch (e) {
      console.log(e)
    }
  },
  async sendInvitationEmail ({ state },
    { student, again }: {student: Student, again: boolean}) {
    try {
      const res = await this.$fire.functions.httpsCallable('api.invite')({
        to: student.email,
        fromName: state.user.displayName,
        firstName: student.firstName,
        lastName: student.lastName,
        again
      })
      return res.data()
    } catch (e) {
      console.log(e)
      return false
    }
  },
  async sendEmail ({ state },
    { emails, subject, emailBody }:
    { emails: string[], subject: string, emailBody: string }) {
    try {
      const res = await this.$fire.functions.httpsCallable('api.sendEmail')({
        to: emails,
        fromName: state.user.displayName,
        subject,
        emailBody
      })
      return res.data()
    } catch (e) {
      console.log(e)
      return false
    }
  }
}
