import Close from "../../assets/close.svg";
import Copy from "../../assets/copy.svg";
import useTypewriter from "../../utils/useTypingEffect";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";
import "./card.styles.scss";

const Card = ({
  onClose,
  content,
  overline,
}: {
  onClose?: () => void;
  content: string;
  overline: string;
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      alert("Copiado");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Erro ao copiar");
    }
  };

  const animatedText = useTypewriter(content);

  return (
    <div className={`card card--${overline}`}>
      <div className="card__header">
        <p className="card__header__overline">{overline}</p>
        <div className="card__header__actions">
          <img src={Copy} width={24} height={24} onClick={handleCopy} />
          <img src={Close} width={24} height={24} onClick={onClose} />
        </div>
      </div>

      <div className="card__body">
        <MarkdownRenderer content={animatedText} />
      </div>
    </div>
  );
};

export default Card;
