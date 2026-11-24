import { useState } from "react";
import Input from "../components/input/Input";
import SelectInline from "../components/select-inline/Select-inline";
import type { ISelectOption } from "../components/select-inline/select-inline.interface";
import "./Home.styles.scss";
import Card from "../components/card/Card";

const API_BASE_URL = "http://localhost:8080/api/audit/natural-text/";

const modelOptions: ISelectOption[] = [
  {
    label: "Gemini Hydrogen",
    value: "hydrogen",
  },
  {
    label: "Gemini flash",
    value: "flash",
  },
  {
    label: "Gemini flash-lite",
    value: "flash-lite",
  },
];

const Home = () => {
  const [inputValue, setInputValue] = useState<string>(localStorage.getItem("inputValue") || "");
  const [responseTextList, setResponseTextList] = useState<{ content: string; model: string }[]>(
    JSON.parse(localStorage.getItem("responses") ?? "[]"),
  );
  const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].value);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_BASE_URL}${selectedModel}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entrada: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o comando");
      }

      const data = await response.text();
      const newItens = [...responseTextList, { content: data, model: selectedModel }];

      setResponseTextList(newItens);

      localStorage.setItem("responses", JSON.stringify(newItens));
    } catch (error) {
      setErrorMessage(String(error));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="home">
      <div className="home__content">
        <div className="home__header">
          <h1>IFBA</h1>
          <h2>Entendimento do Controle Interno</h2>
          <h3>Rafael Dantas - Liz Maria - Vinicius Santos - Sheldon Mesquita</h3>
        </div>
        <form className="home__form" onSubmit={handleSubmit}>
          <Input
            placeholder="Coloque aqui o seu link"
            value={inputValue}
            selectInline={
              <SelectInline
                label="Modelos"
                options={modelOptions}
                onChange={(e) => setSelectedModel(e.target.value)}
              />
            }
            onChange={(e) => {
              localStorage.setItem("inputValue", e.target.value);
              setInputValue(e.target.value);
            }}
            disabled={loading}
          />
        </form>

        {errorMessage.length > 0 && <p className="home__error">{errorMessage}</p>}

        {responseTextList.length > 0 && (
          <div className="home__card-list__container">
            <div className="home__card-list">
              {responseTextList.map((item) => (
                <Card
                  overline={item.model}
                  key={`${item.model}-${item.content}`}
                  content={item.content}
                  onClose={() => {
                    setResponseTextList((response) => {
                      const newItens = response.filter((f) => f.content !== item.content);
                      localStorage.setItem("responses", JSON.stringify(newItens));

                      return newItens;
                    });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
