import { useState, useEffect } from 'react'
import { IAtividade, Prioridade } from '../../model/atividade';
import { AtividadeFormProps } from '../../model/atividadesProps';

const atividadeInicial: IAtividade = {
    id: 0,
    titulo: '',
    prioridade: Prioridade.NaoDefinido,
    descricao: ''
};

const AtividadeForm: React.FC<AtividadeFormProps> = ({
                        ativSelecionada, 
                        atualizarAtividade,
                        addAtividade,
                        cancelarAtividade }: AtividadeFormProps) => {

    const [atividade, setAtividade] = useState<IAtividade>(atividadeAtual());     
    
    useEffect(() => {
        if(ativSelecionada.id !== 0)
            setAtividade(ativSelecionada);
    }, [ativSelecionada]);
    
    const handleValue = (e: any) => {
        const {name, value} = e.target;
        setAtividade({...atividade, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(ativSelecionada.id !== 0)
            atualizarAtividade(atividade)
        else
            addAtividade(atividade);

        setAtividade(atividadeInicial);
    };

    const handleCancelar = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        cancelarAtividade();
        setAtividade(atividadeInicial);
    };

    function atividadeAtual(): IAtividade{
        if (ativSelecionada.id !== 0){
            return ativSelecionada;
        }else{
            return atividadeInicial;
        }
    };
    
  return (
    <>
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
            <label className="form-label">Título</label>
            <input onChange={handleValue}
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
            <select onChange={handleValue} 
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
            <textarea onChange={handleValue}
                name='descricao'
                id="descricao" 
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

export default AtividadeForm;