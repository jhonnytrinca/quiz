import { embaralhar } from '../functions/arrays'
import RespostaModel from './resposta'

export default class QuestaoModel {
  #id: number
  #enunciado: string
  #respostas: RespostaModel[]
  #acertou: boolean

  constructor(id: number, enunciado: string, respostas: RespostaModel[], acertou = false) {
    this.#id = id
    this.#enunciado = enunciado
    this.#respostas = respostas
    this.#acertou = acertou
  }
  
  get id() {
    return this.#id
  }

  get enunciado() {
    return this.#enunciado
  }

  get respostas() {
    return this.#respostas
  }

  get acertou() {
    return this.#acertou
  }

  get respondida() {
    for (let resposta of this.#respostas) {
      if(resposta.revelada) return true
    }
    return false
  }

  responderCom(indice: number): QuestaoModel {
    const acertou = this.#respostas[indice]?.certa
    const resp = this.#respostas.map((resp, i) => {
      const respSelecionada = indice === i; 
      const deveRevelar = respSelecionada || resp.certa
      return deveRevelar ? resp.revelar() : resp
    })
    return new QuestaoModel(this.#id, this.#enunciado, resp, acertou)
  }

  embaralharRespostas(): QuestaoModel {
    let respostasEmbaralhadas = embaralhar(this.#respostas)
    return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
  }

  static criarObjeto(obj: QuestaoModel): QuestaoModel {
    const respostas = obj.respostas.map(resp => RespostaModel.criarObjeto(resp))
    return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou)
  }

  paraObjeto() {
    return {
      id: this.#id,
      enunciado: this.#enunciado,
      respondida: this.respondida,
      acertou: this.#acertou,
      respostas: this.#respostas.map(resp => resp.paraObjeto()),
    }
  }
}