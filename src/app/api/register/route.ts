import {
  createUserPermission,
  getPermissionByName,
} from '@/Database/Queries/permissions'
import { createUser, getUserByEmail } from '@/Database/Queries/user'
import { beginTransaction, commit, db } from '@/Database/database'
import md5 from 'md5'
import { NextApiRequest } from 'next'

export async function POST(request: NextApiRequest) {
  const req = await request.json()

  const { nome, email, senha } = req

  const user = await getUserByEmail(email)
  if (user) {
    return new Response(
      JSON.stringify({
        message: 'Email já cadastrado',
      }),
      { status: 400 },
    )
  }

  const permission = await getPermissionByName('Comprador')

  await beginTransaction()
  const id = await createUser({
    nome,
    email,
    senha: md5(senha),
  })
  await createUserPermission(id as string, permission.id)
  await commit()

  return new Response(JSON.stringify({ id, message: 'Usuário criado' }), {
    status: 201,
  })
}
