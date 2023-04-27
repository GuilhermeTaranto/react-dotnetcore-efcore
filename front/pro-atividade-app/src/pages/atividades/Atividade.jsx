import {useState, useEffect} from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../../api/atividade';
import TitlePage from '../../components/TitlePage';
import AtividadeLista from './AtividadeLista';
import AtividadeForm from './AtividadeForm';

export default function Atividade() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});

  //Abre e fecha o modal
  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);

  const handleConfirmModal = (id) => {
    if(id !== 0 && id !== undefined){
      const atividade = atividades.filter(ativ => ativ.id === id);
      setAtividade(atividade[0]);
    }else{
      setAtividade({id: 0});
    }

    setSmShowConfirmModal(!smShowConfirmModal);
  }
  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  }

  const novaAtividade = () => {
    setAtividade({id: 0});
    handleAtividadeModal();
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      
      if(todasAtividades)
        setAtividades(todasAtividades);
    };

    getAtividades();
  }, [])

  const addAtividade = async (ativ) =>{
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
    handleAtividadeModal();
  }

  const cancelarAtividade = () => {
    setAtividade({id: 0});
    handleAtividadeModal();
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(atividades.map(item => item.id === id ? response.data : item));
    setAtividade({id: 0});
    handleAtividadeModal();
  }

  const deletarAtividade = async (id) => {
    if(await api.delete(`atividade/${id}`)){
      const atividadesFiltradas = atividades.filter(ativ => ativ.id !== id);

      setAtividades([...atividadesFiltradas]);
    }
    handleConfirmModal(0);
  }

  const pegarAtividade = (id) => {
    const atividade = atividades.filter(ativ => ativ.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  return (
    <>
      <TitlePage
        title={'Atividade' + (atividade.id !== 0 ? atividade.id : '')}
      >
        <Button variant="outline-secondary" onClick={novaAtividade}>
              <i className='fas fa-plus'></i>
        </Button>
      </TitlePage>
      
      <AtividadeLista
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        handleConfirmModal={handleConfirmModal}
      />

      {/* Modal para adicionar e editar atividades */}
      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
            <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ''}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AtividadeForm 
              addAtividade={addAtividade}
              cancelarAtividade={cancelarAtividade}
              atualizarAtividade={atualizarAtividade}
              ativSelecionada={atividade}
              atividades={atividades}
            />
        </Modal.Body>
      </Modal>

      {/* Modal de exclusão de atividade */}
      <Modal size='sm' show={smShowConfirmModal} onHide={handleConfirmModal}>
        <Modal.Header closeButton>
            <Modal.Title>
              Excluindo Atividade {atividade.id !== 0 ? atividade.id : ''}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Tem certeza que deseja excluir a Atividade {atividade.id}?
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <button className='btn btn-outline-success me-2' onClick={() => deletarAtividade(atividade.id)}> 
            <i className='fas fa-check me-2'></i> Sim 
          </button>
          <button className='btn btn-danger me-2' onClick={() => handleConfirmModal(0)}> 
            <i className='fas fa-times me-2'></i> Não 
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
