import { getUserByEmail } from '@/Database/Queries/user'
import md5 from 'md5'
import { NextApiRequest } from 'next'
import jwt from 'jsonwebtoken'
import { getUserPermissions } from '@/Database/Queries/permissions'

export async function POST(request: NextApiRequest) {
  const req = await request.json()
  const { email, senha } = req
  const user = await getUserByEmail(email)
  if (!user) {
    return new Response(
      JSON.stringify({
        message: 'Usuário não encontrado',
      }),
      { status: 404 },
    )
  }

  if (user.senha !== md5(senha)) {
    return new Response(
      JSON.stringify({
        message: 'Senha incorreta',
      }),
      { status: 400 },
    )
  }
  const permissions = await getUserPermissions(user.id)
  const permissionsNames = permissions.map((permission) => permission.name)
  const token = jwt.sign(
    {
      iss: user.id,
      name: user.nome,
      email: user.email,
      permissions: permissionsNames,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    },
  )

  return new Response(JSON.stringify({ message: 'Login realizado', token }), {
    status: 200,
  })
}
