export const productNameValidation = (name) => {
    //verifica se o nome não tem só espaço, se tiver, transforma em uma string vazia
    const trimmedNameProduct = name ? name.trim() : '';

    if (!trimmedNameProduct) {
        return 'O nome do produto não pode ser vazio.';
    }

    // verifica se o nome tem pelo menos uma letra
    if (!/[a-zA-ZÀ-ÿ]/.test(trimmedNameProduct)) {
        return 'O nome do produto deve conter pelo menos uma letra.';
    }

    // verifica se tem algum simbolo no nome
    if (!/^[a-zA-ZÀ-ÿ0-9\s]+$/.test(trimmedNameProduct)) {
        return 'O nome do produto não deve conter símbolos.';
    }

    return null;
}


export const productSkuValidation = (sku) => {
    const trimmedSku = sku ? sku.trim() : '';
    

    if (!trimmedSku) {
        return 'O código não pode ser vázio.';
    }

    if (trimmedSku.length != 7) {
        return 'O código precisa ter 7 caracteres.'
    }

    // regex que verifica se o código esta no formato correto de duas letras no inicio, hifen após as letras e terminando com 4 números
    if (/^[A-Za-z]{2}-\d{4}$/) {
        return 'O código não está no padrão correto.'
    }
}