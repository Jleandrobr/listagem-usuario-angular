export class Usuario {

  constructor(public nome = '',
              public idade?: number,
              public cpf: string = '',
              public id?: string) {
  }
}
