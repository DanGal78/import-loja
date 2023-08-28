import jwt from 'jsonwebtoken'

export const isLogged = async (headersReq: any) => {
  const headers: Headers = headersReq.headers
  const token = headers.get('authorization')?.split(' ')[1]
  if (!token) {
    return false
  }

  const { exp } = jwt.verify(token, process.env.JWT_SECRET)
  if (!exp || Date.now() >= exp * 1000) {
    return false
  }

  return true
}

export const isAllowed = async (headersReq: any, permission: string) => {
  const headers: Headers = headersReq.headers
 
  const token = headers.get('authorization')?.split(' ')[1]
 
  if (!token) {
    return false
  }
 
  if (!isLogged(headersReq)) {
    return false
  }

  const { permissions } = jwt.verify(token, process.env.JWT_SECRET)
 
  if (!permissions.includes(permission)) {
    return false
  }
  return true
}
