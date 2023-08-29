import { Database } from 'sqlite3'

export const db = new Database('src/Database/mock.db')

export const beginTransaction = () => {
  return new Promise((resolve, reject) => {
    db.run('BEGIN TRANSACTION', function (err) {
      if (err) {
        reject(err)
        return
      }
      resolve(this.lastID)
    })
  })
}

export const commit = () => {
  return new Promise((resolve, reject) => {
    db.run('COMMIT', function (err) {
      if (err) {
        reject(err)
        return
      }
      resolve(this.lastID)
    })
  })
}
