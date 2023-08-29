import { db } from '../database'

export interface Loja {
  id: number
  nome: string
  nota: number
  categoria: string
  tempo: string
  taxaEntrega: number
  pedidoMinimo: number
  imageLogo: string
  imageCover: string
}

interface CreateLoja {
  nome: string
  nota: number
  categoria: string
  tempo: string
  taxaEntrega: number
  pedidoMinimo: number
  imageLogo: string
  imageCover: string
}

export const getLojas = () => {
  return new Promise<Loja[]>((resolve, reject) => {
    db.all<Loja>('SELECT id, nome, nota, categoria, tempo, taxa_entrega AS taxaEntrega, pedido_minimo AS pedidoMinimo,image_logo AS imageLogo, image_cover AS imageCover FROM lojas', 
    (err, rows) => {
      if (err) {
        reject(err)
        return
      }

      resolve(rows)
    })
  })
}

export const getLojaById = (id: number | string) => {
  return new Promise<Loja>((resolve, reject) => {
    db.get<Loja>('SELECT id, nome, nota, categoria, tempo, taxa_entrega AS taxaEntrega, pedido_minimo AS pedidoMinimo,image_logo AS imageLogo, image_cover AS imageCover FROM lojas WHERE id = ?', 
    [id], (err, row) => {
      if (err) {
        reject(err)
        return
      }

      resolve(row)
    })
  })
}

export const createLoja = (loja: CreateLoja) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO lojas (nome, nota, categoria, tempo, taxa_entrega, pedido_minimo, image_logo, image_cover) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        loja.nome,
        loja.nota,
        loja.categoria,
        loja.tempo,
        loja.taxaEntrega,
        loja.pedidoMinimo,
        loja.imageLogo,
        loja.imageCover,
      ],
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

export const updateLoja = (id: number | string, loja: Partial<CreateLoja>) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE lojas SET nome = ?, nota = ?, categoria = ?, tempo = ?, taxa_entrega = ?, pedido_minimo = ?, image_logo = ?, image_cover = ? WHERE id = ?',
      [
        loja.nome,
        loja.nota,
        loja.categoria,
        loja.tempo,
        loja.taxaEntrega,
        loja.pedidoMinimo,
        loja.imageLogo,
        loja.imageCover,
        id,
      ],
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

export const deleteLoja = (id: number | string) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM lojas WHERE id = ?', [id], function (err) {
      if (err) {
        reject(err)
        return
      }
      resolve(this.lastID)
    })
  })
}
