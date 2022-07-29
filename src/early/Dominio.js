function Dominio(props) {
    console.log(props);
    const listaDeRegras = [];
    for (let regras of Object.values(props.regras)) {
        for (let regra of regras) {
            listaDeRegras.push(regra);
        }
    }

    return (
        <div>
            <h3>D{props.indice}</h3>
            {listaDeRegras.map((regra, i) => {
                console.log("regra ", regra);
                const [ladoEsquerdo, ladoDireito, posicaoDoPonto, dominioDeOrigem] = regra;
                console.log(ladoEsquerdo, ladoDireito, posicaoDoPonto, dominioDeOrigem);
                return (
                    <div key={i}>
                        {ladoEsquerdo} -&gt; {ladoDireito.substr(0, posicaoDoPonto)}.{ladoDireito.substr(posicaoDoPonto)}/{dominioDeOrigem}
                    </div>
                )
            })}
        </div>
    );
}

export default Dominio;
