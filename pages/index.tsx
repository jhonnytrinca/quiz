import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Questionario from '../components/Questionario';
import QuestaoModel from '../model/questao';

const BASE_URL = 'http://localhost:3000/api';

const Home = () => {
  const [ids, setIds] = useState<number[]>([]);
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respCorretas, setRespCorretas] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    carregarIds();
  }, []);

  useEffect(() => {
    ids.length > 0 && carregarQuestoes(ids[0]);
  }, [ids]);

  const carregarIds = async () => {
    const resp = await fetch(`${BASE_URL}/questionario`);
    const ids = await resp.json();
    setIds(ids);
  };

  const carregarQuestoes = async (id: number) => {
    const resp = await fetch(`${BASE_URL}/questoes/${id}`);
    const json = await resp.json();
    const questoes = QuestaoModel.criarObjeto(json);
    setQuestao(questoes);
  };

  const questaoRespondida = (questao: QuestaoModel) => {
    setQuestao(questao);
    const acertou = questao.acertou;
    setRespCorretas(respCorretas + (acertou ? 1 : 0));
  };

  const proximoPasso = () => {
    const proximo = idProxima();
    proximo ? irProxima(proximo) : finalizar();
  };

  const idProxima = () => {
    const proximo = ids.indexOf(questao!.id) + 1;
    return ids[proximo];
  };

  const irProxima = (proximo: number) => {
    carregarQuestoes(proximo);
  };

  const finalizar = () => {
    router.push({
      pathname: '/resultado',
      query: {
        total: ids.length,
        certas: respCorretas
      }
    });
  };

  return questao ? (
    <Questionario
      questao={questao}
      ultima={idProxima() === undefined}
      questaoRespondida={questaoRespondida}
      proximoPasso={proximoPasso}
    />
  ) : (
    false
  );
};

export default Home;
