import { deleteLoja, getLojaById, updateLoja } from '@/Database/Queries/loja'
import { NextApiRequest } from 'next'
import { isAllowed } from '../../isLoged'
interface ParamsDTO {
  params: {
    id: string
  }
}

export async function GET(request: NextApiRequest, params: ParamsDTO) {
  const { id } = params.params

  const loja = await getLojaById(id)
  if (!loja) {
    return new Response(JSON.stringify({ message: 'Loja não encontrada' }), {
      status: 404,
    })
  }

  return new Response(JSON.stringify(loja), {
    status: 200,
  })
}

export async function PUT(request: NextApiRequest, params: ParamsDTO) {
  const { id } = params.params
  const req = await request.json()

  const allowed = await isAllowed(request, 'Administrador')
  if (!allowed) {
    return new Response(JSON.stringify({ message: 'Sem permissão' }), {
      status: 403,
    })
  }

  const {
    nome,
   
    categoria,
    tempo,
    taxaEntrega,
    pedidoMinimo,
    imageLogo,
    imageCover,
  } = req

  const loja = await getLojaById(id)
  if (!loja) {
    return new Response(JSON.stringify({ message: 'Loja não encontrada' }), {
      status: 404,
    })
  }

  updateLoja(id, {
    nome,
   
    categoria,
    tempo,
    taxaEntrega,
    pedidoMinimo,
    imageLogo,
    imageCover,
  })

  return new Response(JSON.stringify({ message: 'Loja atualizada' }), {
    status: 200,
  })
}

export async function DELETE(request: NextApiRequest, params: ParamsDTO) {
  const { id } = params.params

  const allowed = await isAllowed(request, 'Administrador')
  if (!allowed) {
    return new Response(JSON.stringify({ message: 'Sem permissão' }), {
      status: 403,
    })
  }
  const loja = await getLojaById(id)
  if (!loja) {
    return new Response(JSON.stringify({ message: 'Loja não encontrada' }), {
      status: 404,
    })
  }

  await deleteLoja(id)

  return new Response(JSON.stringify({ message: 'Loja desativada' }), {
    status: 200,
  })
}
