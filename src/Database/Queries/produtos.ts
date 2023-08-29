import { db } from '../database'
import { Loja } from './loja'
interface ProdutoImagem {
  id: number
  url: string
  isDestaque: boolean
}

interface Produto {
  id: number | string
  nome: string
  preco: number
  loja_id: number | string
  descricao: string
  loja?: Loja
  imagens?: ProdutoImagem[]
}

interface CreateProduto {
  nome: string
  preco: number
  loja_id: number | string
  descricao: string
}

export const getProdutos = () => {
  return new Promise<Produto[]>((resolve, reject) => {
    db.all<Produto>(
      'SELECT * FROM produtos INNER JOIN lojas ON produtos.loja_id = lojas.id INNER JOIN produto_imagens ON produtos.id = produto_imagens.produto_id',
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

export const getProdutoById = (id: number | string) => {
  return new Promise<Produto>((resolve, reject) => {
    db.get<Produto>('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err)
        return
      }

      resolve(row)
    })
  })
}

export const createProduto = (produto: CreateProduto) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO produtos (nome, preco, loja_id, descricao) VALUES (?, ?, ?, ?)',
      [produto.nome, produto.preco, produto.loja_id, produto.descricao],
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

export const updateProduto = (
  id: number | string,
  produto: Partial<CreateProduto>,
) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE produtos SET nome = ?, preco = ?, loja_id = ?, descricao = ? WHERE id = ?',
      [produto.nome, produto.preco, produto.loja_id, produto.descricao, id],
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

export const deleteProduto = (id: number | string) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
      if (err) {
        reject(err)
        return
      }
      resolve(this.lastID)
    })
  })
}

export const getProdutoByLojaId = (lojaId: number | string) => {
  return new Promise<Produto[]>((resolve, reject) => {
    db.all<Produto>(
      'SELECT * FROM produtos WHERE loja_id = ?',
      [lojaId],
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
