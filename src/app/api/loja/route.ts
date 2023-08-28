import { createLoja, getLojas } from '@/Database/Queries/loja'
import { NextApiRequest } from 'next'
import { isAllowed } from '../isLoged'

export async function GET(req: NextApiRequest) {
  const lojas = await getLojas()

  return new Response(JSON.stringify(lojas), {
    status: 200,
  })
}

export async function POST(request: NextApiRequest) {
  const req = await request.json()

  const allowed = await isAllowed(request, 'Administrador')
  if (!allowed) {
    return new Response(JSON.stringify({ message: 'Sem permissão' }), {
      status: 403,
    })
  }
  const {
    nome,
    nota,
    categoria,
    tempo,
    taxaEntrega,
    pedidoMinimo,
    imageLogo,
    imageCover,
  } = req

  const lojaId = await createLoja({
    nome,
    nota,
    categoria,
    tempo,
    taxaEntrega,
    pedidoMinimo,
    imageLogo,
    imageCover,
  })

  return new Response(JSON.stringify({ message: 'Loja criada' }), {
    status: 201,
  })
}
