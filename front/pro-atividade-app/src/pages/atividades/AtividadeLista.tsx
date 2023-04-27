import { AtividadeListaProps } from "../../model/atividadesProps";
import AtividadeItem from "./AtividadeItem";


const AtividadeLista: React.FC<AtividadeListaProps> = ({atividades, pegarAtividade, handleConfirmModal }: AtividadeListaProps) => {
  return (
    <div className="mt-3">
        {atividades.map(ativ => (
            <AtividadeItem 
                key={ativ.id}
                ativ={ativ}
                pegarAtividade={pegarAtividade}
                handleConfirmModal={handleConfirmModal}
            />
        ))}
    </div>
  )
}

export default AtividadeLista;
