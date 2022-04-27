import QuestaoModel from '../model/questao';
import styles from '../styles/Questionario.module.css';
import Botao from './Botao';
import Questao from './Questao';

interface QuestionarioProps {
  questao: QuestaoModel;
  ultima: boolean;
  questaoRespondida: (questao: QuestaoModel) => void;
  proximoPasso: () => void;
}

const Questionario = (props: QuestionarioProps) => {
  const respostaFornecida = (i: number) => {
    if (!props.questao.respondida) {
      props.questaoRespondida(props.questao.responderCom(i));
    }
  };

  return (
    <div className={styles.questionario}>
      {props.questao ? (
        <Questao
          valor={props.questao}
          respostaFornecida={respostaFornecida}
          tempoEsgotado={props.proximoPasso}
        />
      ) : (
        false
      )}

      <Botao
        onClick={props.proximoPasso}
        texto={props.ultima ? 'Finalizar' : 'Próxima'}
      />
    </div>
  );
};

export default Questionario;
