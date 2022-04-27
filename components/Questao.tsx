import QuestaoModel from '../model/questao';
import styles from '../styles/Questao.module.css';
import Enunciado from './Enunciado';
import Resposta from './Resposta';
import Temporizador from './Temporizador';

interface QuestaoProps {
  valor: QuestaoModel;
  respostaFornecida: (i: number) => void;
  tempoEsgotado: () => void;
  tempoParaResposta?: number;
}

const letras = [
  { valor: 'A', cor: '#F2C866' },
  { valor: 'B', cor: '#F266BA' },
  { valor: 'C', cor: '#85D4F2' },
  { valor: 'D', cor: '#BCE596' }
];

const Questao = (props: QuestaoProps) => {
  const questao = props.valor;

  const renderRespostas = () => {
    return questao.respostas.map((resp, i) => {
      return (
        <Resposta
          key={`${questao.id}-${i}`}
          valor={resp}
          indice={i}
          letra={letras[i].valor}
          bgLetra={letras[i].cor}
          respostaFornecida={props.respostaFornecida}
        />
      );
    });
  };

  return (
    <div className={styles.questao}>
      <Enunciado texto={questao.enunciado} />
      <Temporizador
        duracao={props.tempoParaResposta ?? 10}
        tempoEsgotado={props.tempoEsgotado}
        key={questao.id}
      />
      {renderRespostas()}
    </div>
  );
};

export default Questao;
