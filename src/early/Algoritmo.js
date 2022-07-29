// tentativa de simular set de tupla
class ArraySet extends Set {
    add(arr) {
        super.add(JSON.stringify(arr));
    }

    has(arr) {
        return super.has(JSON.stringify(arr));
    }
}

function reconhecerPalavra(palavra, V, T, P, S) {
    const n = palavra.length;
    const dominios = [];
    dominios.push(construirD0(V, T, P, S));
    for (let i = 0; i < n; i++) {
        dominios.push(construirDr(V, T, P, S, dominios, palavra[i]));
    }

    for (let producao of dominios[n][''] ?? []) {
        if (producao[0] === S && producao[3] === 0) {
            return true;
        }
    }

    return false;
}

// a) Construção do primeiro conjunto de produções
function construirD0(V, T, P, S) {
    const d0 = {};
    const memo = {};

    // 1
    for (let ladoDireito of P[S]) {
        const simboloDepoisDoPonto = ladoDireito === '' ? '' : ladoDireito[0];
        if (!d0[simboloDepoisDoPonto]) {
            d0[simboloDepoisDoPonto] = [];
            memo[simboloDepoisDoPonto] = new ArraySet();
        }
        const regra = [S, ladoDireito, 0, 0];
        d0[simboloDepoisDoPonto].push(regra);
        memo[simboloDepoisDoPonto].add(regra);
    }

    // 2
    let inclusoes;
    do {
        inclusoes = false;
        for (let v of V) {
            if (!d0[v]) {
                continue
            }
            for (let ladoDireito of P[v]) {
                const simboloDepoisDoPonto = ladoDireito === '' ? '' : ladoDireito[0];
                if (!d0[simboloDepoisDoPonto]) {
                    d0[simboloDepoisDoPonto] = [];
                    memo[simboloDepoisDoPonto] = new ArraySet();
                }
                const regraDeDominio = [v, ladoDireito, 0, 0];
                if (!memo[simboloDepoisDoPonto].has(regraDeDominio)) {
                    d0[simboloDepoisDoPonto].push(regraDeDominio);
                    memo[simboloDepoisDoPonto].add(regraDeDominio);
                    inclusoes = true;
                }
            }
        }
    } while(inclusoes);

    return d0;
}

// b) Construção dos demais conjuntos de produções
function construirDr(V, T, P, S, dominios, simbolo) {
    const dr = {};
    const memo = {};

    const r = dominios.length;

    for (let regraDeDominio of dominios[r-1][simbolo] ?? []) {
        const [esquerda, direita, posicaoDoPonto, dominioDeOrigem] = regraDeDominio;
        const novaPosicaoDoPonto = posicaoDoPonto + 1;
        const simboloDepoisDoPonto = direita.length <= novaPosicaoDoPonto ? '' : direita[novaPosicaoDoPonto];
        if (!dr[simboloDepoisDoPonto]) {
            dr[simboloDepoisDoPonto] = [];
            memo[simboloDepoisDoPonto] = new ArraySet();
        }
        const regra = [esquerda, direita, novaPosicaoDoPonto, dominioDeOrigem];
        dr[simboloDepoisDoPonto].push(regra);
        memo[simboloDepoisDoPonto].add(regra);
    }

    let inclusoes;
    do {
        inclusoes = false;
        // 3
        for (let v of V) {
            if (!dr[v]) {
                continue;
            }
            for (let ladoDireito of P[v]) {
                const simboloDepoisDoPonto = ladoDireito === '' ? '' : ladoDireito[0];
                if (!dr[simboloDepoisDoPonto]) {
                    dr[simboloDepoisDoPonto] = [];
                    memo[simboloDepoisDoPonto] = new ArraySet();
                }
                const novaRegra = [v, ladoDireito, 0, r];
                if (!memo[simboloDepoisDoPonto].has(novaRegra)) {
                    dr[simboloDepoisDoPonto].push(novaRegra);
                    memo[simboloDepoisDoPonto].add(novaRegra);
                    inclusoes = true;
                }
            }
        }

        // 4
        const regrasTerminandoEmPontoBarra = structuredClone(dr['']);
        for (let regraDeDominio of regrasTerminandoEmPontoBarra ?? []) {
            const [esquerda, , , dominioDeOrigem] = regraDeDominio;
            if (!dominios[dominioDeOrigem][esquerda]) {
                continue;
            }
            const regrasNoDominioDeOrigem = structuredClone(dominios[dominioDeOrigem][esquerda]);
            for (let regra of regrasNoDominioDeOrigem) {
                const novaRegra = [regra[0], regra[1], regra[2] + 1, regra[3]];
                const [, ladoDireito, posicaoDoPonto, ] = novaRegra;
                const simboloDepoisDoPonto = ladoDireito.length <= posicaoDoPonto ? '' : ladoDireito[posicaoDoPonto];
                if (!dr[simboloDepoisDoPonto]) {
                    dr[simboloDepoisDoPonto] = [];
                    memo[simboloDepoisDoPonto] = new ArraySet();
                }
                if (!memo[simboloDepoisDoPonto].has(novaRegra)) {
                    dr[simboloDepoisDoPonto].push(novaRegra);
                    memo[simboloDepoisDoPonto].add(novaRegra);
                    inclusoes = true;
                }
            }    
        }

    } while(inclusoes);

    return dr;
}

export default reconhecerPalavra;
