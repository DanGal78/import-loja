import { db } from '../database'

interface Permission {
  id: number
  name: string
}

export const getPermissions = () => {
  return new Promise<Permission[]>((resolve, reject) => {
    db.all<Permission>('SELECT * FROM permissions', (err, rows) => {
      if (err) {
        reject(err)
        return
      }

      resolve(rows)
    })
  })
}

export const getPermissionById = (id: number | string) => {
  return new Promise<Permission>((resolve, reject) => {
    db.get<Permission>(
      'SELECT * FROM permissions WHERE id = ?',
      [id],
      (err, row) => {
        if (err) {
          reject(err)
          return
        }

        resolve(row)
      },
    )
  })
}

export const getPermissionByName = (nome: string) => {
  return new Promise<Permission>((resolve, reject) => {
    db.get<Permission>(
      'SELECT * FROM permissions WHERE name = ?',
      [nome],
      (err, row) => {
        if (err) {
          reject(err)
          return
        }

        resolve(row)
      },
    )
  })
}

export const createUserPermission = (
  userId: number | string,
  permissionId: number | string,
) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO user_permissions (user_id, permission_id) VALUES (?, ?)',
      [userId, permissionId],
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

export const getUserPermissions = (userId: number | string) => {
  return new Promise<Permission[]>((resolve, reject) => {
    db.all<Permission>(
      `
        SELECT permissions.name FROM permissions
        INNER JOIN user_permissions ON user_permissions.permission_id = permissions.id
        WHERE user_permissions.user_id = ?
        `,
      [userId],
      (err, rows) => {
        if (err) {
          reject(err)
          return
        }

        resolve(rows)
      },
    )
  })
}
