import { NextApiRequest } from 'next'
import { isAllowed } from '../../isLoged'
import {
  deleteProduto,
  getProdutoById,
  updateProduto,
} from '@/Database/Queries/produtos'
interface ParamsDTO {
  params: {
    id: string
  }
}

export async function GET(req: NextApiRequest, par: ParamsDTO) {
  const { id } = params.params
  const produto = getProdutoById(id)
  if (!produto) {
    return new Response(JSON.stringify({ message: 'Produto não encontrado' }), {
      status: 404,
    })
  }
  return new Response(JSON.stringify(produto), {
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

  const { nome, preco, descricao } = req

  const produto = await getProdutoById(id)
  if (!produto) {
    return new Response(JSON.stringify({ message: 'Produto não encontrado' }), {
      status: 404,
    })
  }

  updateProduto(id, {
    nome,
    preco,
    descricao,
  })

  return new Response(JSON.stringify({ message: 'Produto atualizado' }), {
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

  const produto = await getProdutoById(id)
  if (!produto) {
    return new Response(JSON.stringify({ message: 'Produto não encontrado' }), {
      status: 404,
    })
  }

  deleteProduto(id)

  return new Response(JSON.stringify({ message: 'Produto deletado' }), {
    status: 200,
  })
}
