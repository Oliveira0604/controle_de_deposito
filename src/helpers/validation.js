export const validateName = (name) => {
    // tirando os espaços do inicio e final
    const trimmedName = name ? name.trim() : '';

    // verificando se o nome é vázio
    if (trimmedName === '') {
        return 'O nome é obrigatório';
    }

    // verifica se o nome tem menos de 3 letras
    if (trimmedName.length < 3) {
        return 'O nome precisa ter 3 letras ou mais';
    }

    // verifica se o nome tem símbolos ou números
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmedName)) {
        return 'O nome não deve conter números ou símbolos.';
    }

    return null;
}

export const validatePassword = (password, confirmPassword) => {

    const trimmedPassword = password ? password.trim() : '';
    const trimmedConfirmPassword = confirmPassword ? confirmPassword.trim() : '';
    // verifica se as senhas estão vindo vazias.
    if (!trimmedPassword || !trimmedConfirmPassword) {
        return 'As senhas não podem ser vazias';
    }

    // verifica se as senhas são iguais
    if (trimmedPassword != trimmedConfirmPassword) {
        return 'As senhas não conhecidem';
    }

    // criando os padrões Regex para verificar letras maiúsculas, minúsculas e caracteres especiais e se tem 8 ou mais caracteres
    const hasUpperCase = /[A-Z]/.test(trimmedPassword);
    const hasLowerCase = /[a-z]/.test(trimmedPassword);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword);
    const isLengthValid = trimmedPassword.length >= 8;

    // verifica se atende a todas as condições
    if (!hasUpperCase || !hasLowerCase || !hasSymbols || !isLengthValid) {
        return 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e símbolos.';
    }

    return null;
}