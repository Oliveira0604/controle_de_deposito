export const productNameValidation = (name) => {
    //verifica se o nome não tem só espaço, se tiver, transforma em uma string vazia
    const parsedName = String(name)
    const trimmedNameProduct = parsedName ? parsedName.trim() : '';

    if (!trimmedNameProduct) {
        return 'O nome do produto não pode ser vazio';
    }

    // verifica se o nome tem pelo menos uma letra
    if (!/[a-zA-ZÀ-ÿ]/.test(trimmedNameProduct)) {
        return 'O nome do produto deve conter pelo menos uma letra';
    }

    // verifica se tem algum simbolo no nome
    if (!/^[a-zA-ZÀ-ÿ0-9\s]+$/.test(trimmedNameProduct)) {
        return 'O nome do produto não deve conter símbolos.';
    }

    return null;
}

