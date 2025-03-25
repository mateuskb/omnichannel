export interface AddressInterface {
    bairro: string;
    cep: string;
    complemento: string;
    ddd: string;
    estado: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    regiao: string;
    siafi: string;
    uf: string;
    unidade: string;
}

const objectToAddress = (object: any): AddressInterface => {
    return {
        bairro: object.bairro,
        cep: object.cep,
        complemento: object.complemento,
        ddd: object.ddd,
        estado: object.estado,
        gia: object.gia,
        ibge: object.ibge,
        localidade: object.localidade,
        logradouro: object.logradouro,
        regiao: object.regiao,
        siafi: object.siafi,
        uf: object.uf,
        unidade: object.unidade,
    }
}

export {
    objectToAddress,
}