const DateTime = (seconds) => {
    const milissegundos = seconds * 1000;
    const dataAtualizacao = new Date(milissegundos);
    return dataAtualizacao;
};

module.exports = DateTime;