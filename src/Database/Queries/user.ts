import { db } from '../database'

interface User {
  id: number
  nome: string
  email: string
  senha: string
}

export const getUserByEmail = (email: string) => {
  return new Promise<User>((resolve, reject) => {
    db.get<User>('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        reject(err)
        return
      }

      resolve(row)
    })
  })
}

interface CreateUser {
  nome: string
  email: string
  senha: string
}

export const createUser = (user: CreateUser) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)',
      [user.nome, user.email, user.senha],
      function (err) {
        if (err) {
          reject(err)
          return
        }
        resolve(this.lastID)
      },
    )
  })
}
