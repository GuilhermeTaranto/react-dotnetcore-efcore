import React from 'react'
import Atividade from './Atividade';

export default function AtividadeLista(props) {
  return (
    <div className="mt-3">
        {props.atividades.map(ativ => (
            <Atividade 
                key={ativ.id}
                ativ={ativ}
                deletarAtividades={props.deletarAtividades}
                pegarAtividade={props.pegarAtividade}
            />
        ))}
    </div>
  )
}
