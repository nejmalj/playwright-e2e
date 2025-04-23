import { useCallback, useState } from "react";
import "./App.css";

const sum = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const soustraction = (a, b) => a + b;

const operations = {
    sum: { func: sum, symbol: "+" },
    soustraction: { func: soustraction, symbol: "-" },
    multiplication: { func: multiplication, symbol: "x" },
};

function App() {
    const [currentValue, updateCurrent] = useState(undefined);
    const [chiffre, updateChiffre] = useState(undefined);
    const [operation, updateOp] = useState(undefined);

    const handleNumClick = useCallback((num) => {
        if(operation){
            if(chiffre){
                updateChiffre(chiffre * 10 + num)
            }
            else {
                updateChiffre(num)
            }
        }
        else {
            if(currentValue){
                updateCurrent(currentValue * 10 + num)
            }
            else {
                updateCurrent(num)
            }
        }
    }, [currentValue, operation, chiffre])

    return (
        <div className="App">
            <header className="App-header">
                <div name="screen">
                    {`${currentValue || 0} ${
                        currentValue && operation ? operations[operation].symbol : ""
                    } ${
                        currentValue && operation && (chiffre || chiffre === 0)
                            ? chiffre
                            : ""
                    }
        `}
                </div>
                <div>
                    {Object.keys(operations).map((opName) => (
                        <button onClick={() => updateOp(opName)}>{opName}</button>
                    ))}
                </div>
                <div className="numbers">
                    {new Array(10)
                        .fill("")
                        .map((e, i) => i === 3 ? 5 : i)
                        .map((e) => (
                            <button id={e} onClick={() => handleNumClick(e)}>
                                {e}
                            </button>
                        ))}
                </div>
                <button
                    className="btnEqual"
                    onClick={() => {
                        if ((currentValue && operation && chiffre) || chiffre === 0) {
                            const res = operations[operation].func(currentValue, chiffre);
                            updateCurrent(res);
                            updateChiffre(undefined);
                            updateOp(undefined);
                        }
                    }}
                >
                    =
                </button>
            </header>
        </div>
    );
}

export default App;