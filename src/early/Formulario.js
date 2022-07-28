function Formulario() {
    return (
        <form>
            <label className="form-label text-start mt-4 h4">Símbolo inicial</label>
            <input className="form-control" placeholder="Insira o símbolo inicial (apenas um caracter)"/>
            <label className="form-label text-start mt-4 h4">Regras de produção</label>
            <textarea className="form-control" placeholder="Insira as regras de produção, uma por linha"/>
            <p className="m-0"><a href="">Clique aqui</a> para saber como inserir sua gramática corretamente</p>
            <label className="form-label text-start mt-4 h4">Palavra a ser reconhecida</label>
            <input className="form-control" placeholder="Insira uma palavra"/>
            <button class="btn btn-primary mt-4 mb-1" type="submit">Tudo pronto! Executar Early Parser</button>
            <p className="">Ao invés disso, <a href="">preencher os campos com uma gramática de exemplo</a></p>
        </form>
    );
}

export default Formulario;
