import { BaseResourceModel } from '../models/base-resource-model';

export class Pessoa extends BaseResourceModel {
    constructor(
        // public id?: string,
        public nome?: string,
        public apelido?: string,
        public nascimento?: string
    ) {
      super();
    }
    static fromJson(jsonData: any): Pessoa {
      return Object.assign(new Pessoa(), jsonData);
    }

}
