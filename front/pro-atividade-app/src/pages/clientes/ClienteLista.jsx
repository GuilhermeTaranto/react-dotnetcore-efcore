import { InputGroup, Form, Button } from 'react-bootstrap';
import TitlePage from '../../components/TitlePage';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const clientes = [
  {
      id: 1,
      nome: 'Microsoft',
      resposanel: 'Otto',
      contato: '123456789',
      situacao: 'Ativo'
  },
  {
      id: 2,
      nome: 'Amazon',
      resposanel: 'Willian',
      contato: '123456789',
      situacao: 'Desativado'
  },
  {
      id: 3,
      nome: 'Google',
      resposanel: 'Otto',
      contato: '123456789',
      situacao: 'Em análise'
  },
  {
      id: 4,
      nome: 'Facebook',
      resposanel: 'Kevin',
      contato: '123456789',
      situacao: 'Ativo'
  },
  {
      id: 5,
      nome: 'Twitter',
      resposanel: 'Jack',
      contato: '123456789',
      situacao: 'Ativo'
  }
]

export default function ClienteLista() {
  const history = useHistory();
  const [termoBusca, setTermoBusca] = useState('');

  const handleInputChange = (e) => {
    setTermoBusca(e.target.value);
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    return (
      Object.values(cliente).join(' ').toLowerCase().includes(termoBusca.toLowerCase())
    );
  });

  const novoCliente = () => {
    history.push('/cliente/detalhe');
  }

  return (
    <>
        <TitlePage title='Cliente Lista'>
          <Button variant='outline-secondary' onClick={novoCliente}>
            <i className='fas fa-plus -me-2'></i>
            Novo cliente
          </Button>
        </TitlePage>
        <InputGroup className="mb-3 mt-3 mb-3">
          <InputGroup.Text> Buscar: </InputGroup.Text>
          <Form.Control
              onChange={handleInputChange}
              placeholder='Buscar'
          />
        </InputGroup>
        <table className="table table-striped table-hover">
          <thead className='table-dark mt-3'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Responsável</th>
              <th scope="col">Contato</th>
              <th scope="col">Situação</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map(cliente => 
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.resposanel}</td>
                <td>{cliente.contato}</td>
                <td>{cliente.situacao}</td>
                <td>
                  <div>
                    <button className='btn btn-sm btn-outline-primary me-2' 
                            onClick={() => history.push(`/cliente/detalhe/${cliente.id}`)}>
                      <i className='fas fa-user-edit me-2'></i>
                      Editar
                    </button>
                    <button className='btn btn-sm btn-outline-danger me-2'>
                      <i className='fas fa-user-times me-2'></i>
                      Desativar
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </>
  )
}
