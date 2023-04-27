import { Button } from 'react-bootstrap';
import TitlePage from '../../components/TitlePage';
import { useNavigate, useParams } from 'react-router-dom';

const ClienteForm: React.FC = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  return (
    <>
        <TitlePage title={'Cliente Detalhes ' + (id !== undefined ? id : '')}>
          <Button variant='outline-secondary'
                  onClick={() => navigate('/cliente/lista')}>
              <i className='fas fa-arrow-left me-2'></i>
              Voltar
          </Button>
        </TitlePage>
        
        <div>clienteLista</div>
    </>
  )
}

export default ClienteForm;