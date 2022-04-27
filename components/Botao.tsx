import Link from 'next/link';
import styles from '../styles/Botao.module.css';

interface BotaoProps {
  href?: string;
  texto: string;
  onClick?: (e: any) => void;
}

const Botao = (props: BotaoProps) => {
  const renderBotao = () => {
    return (
      <button className={styles.botao} onClick={props.onClick}>
        {props.texto}
      </button>
    );
  };
  return props.href ? (
    <Link href={props.href}>{renderBotao()}</Link>
  ) : (
    renderBotao()
  );
};

export default Botao;
