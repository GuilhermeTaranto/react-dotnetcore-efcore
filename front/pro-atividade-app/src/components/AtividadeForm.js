import { useState, useEffect } from 'react'

const atividadeInicial = {
    id: 0,
    titulo: '',
    prioridade: 0,
    descricao: ''
};

export default function AtividadeForm(props) {
    const [atividade, setAtividade] = useState(atividadeAtual());     
    
    useEffect(() => {
        if(props.ativSelecionada.id !== 0)
            setAtividade(props.ativSelecionada);
    }, [props.ativSelecionada]);
    
    const inputTextHandler = (e) => {
        const {name, value} = e.target;
        setAtividade({...atividade, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(props.ativSelecionada.id !== 0)
            props.atualizarAtividade(atividade)
        else
            props.addAtividade(atividade);

        setAtividade(atividadeInicial);
    };

    const handleCancelar = (e) => {
        e.preventDefault();
        props.cancelarAtividade();
        setAtividade(atividadeInicial);
    };

    function atividadeAtual(){
        if (props.ativSelecionada.id !== 0){
            return props.ativSelecionada;
        }else{
            return atividadeInicial;
        }
    };
    
  return (
    <>
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
            <label className="form-label">Título</label>
            <input onChange={inputTextHandler}
                name='titulo'
                id="titulo" 
                type="text" 
                className="form-control" 
                placeholder="titulo"
                value={atividade.titulo}
            />
            </div>
            <div className="col-md-6">
            <label className="form-label">Prioridade</label>
            <select onChange={inputTextHandler} 
                name='prioridade' 
                id="prioridade" 
                className="form-select"
                value={atividade.prioridade}
            >
                <option value="Naodefinido">Selecione...</option>
                <option value="Baixa">Baixa</option>
                <option value="Normal">Normal</option>
                <option value="Alta">Alta</option>
            </select>
            </div>
            
            <div className="col-md-12">
            <label className="form-label">Descrição</label>
            <textarea onChange={inputTextHandler}
                name='descricao'
                id="descricao" 
                type="text" 
                className="form-control" 
                placeholder="descricao" 
                value={atividade.descricao}
            />
            <hr />
            </div>
            <div className="col-12 mt-0">
                {
                    atividade.id === 0 ?
                        <button className='btn btn-outline-success' type='submit'> 
                            <i className='fas fa-plus me-2'></i> Salvar 
                        </button>
                        :
                        <>
                            <button className='btn btn-outline-success me-2' type='submit'> 
                                <i className='fas fa-plus me-2'></i> Salvar 
                            </button>
                            <button className='btn btn-outline-warning' onClick={handleCancelar}> Cancelar </button>
                        </>
                }
            </div>
        </form>
    </>
  )
}
