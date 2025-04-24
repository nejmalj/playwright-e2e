import {useCallback, useEffect, useState} from "react";
import "./App.css";

const sum = (a, b) => a + b;
const soustraction = (a, b) => a - b;
const multiplication = (a, b) => a * b;

const operations = {
    sum: { func: sum, symbol: "+" },
    soustraction: { func: soustraction, symbol: "-" },
    multiplication: { func: multiplication, symbol: "x" },
};

function App() {
    const [currentValue, updateCurrent] = useState(undefined);
    const [chiffre, updateChiffre] = useState(undefined);
    const [operation, updateOp] = useState(undefined);
    const [error, setError] = useState("");

    const handleNumClick = useCallback((num) => {
        setError("");
        if (operation) {
            updateChiffre((prev) => (prev !== undefined ? prev * 10 + num : num));
        } else {
            updateCurrent((prev) => (prev !== undefined ? prev * 10 + num : num));
        }
    }, [operation]);

    useEffect(() => {
        if (!currentValue && operation && chiffre === undefined) {
            setError("You should click on a number first");
        } else if (currentValue && chiffre !== undefined && operation) {
            // Operation already exists and both numbers are entered
            setError("");
        }
    }, [currentValue, chiffre, operation]);

    const handleOpClick = (opName) => {
        if (!currentValue) {
            setError("You should click on a number first");
        } else if (operation) {
            setError("Too many operators");
        } else {
            updateOp(opName);
            setError("");
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <div id="banner">
                    {`${currentValue || 0} ${operation ? operations[operation].symbol : ""} ${chiffre !== undefined ? chiffre : ""}`}
                </div>
                <div id="errormessage">{error}</div>
                <div className="operators">
                    {Object.keys(operations).map((opName) => (
                        <button id={`button-${opName}`} onClick={() => handleOpClick(opName)}>
                            {operations[opName].symbol}
                        </button>
                    ))}
                </div>
                <div className="numbers">
                    {[...Array(10).keys()].map((e) => (
                        <button id={`${e}`} key={e} onClick={() => handleNumClick(e)}>
                            {e}
                        </button>
                    ))}
                </div>
                <button
                    className="btnEqual"
                    onClick={() => {
                        if ((currentValue !== undefined && operation && chiffre !== undefined)) {
                            const res = operations[operation].func(currentValue, chiffre);
                            updateCurrent(res);
                            updateChiffre(undefined);
                            updateOp(undefined);
                        }
                    }}
                >
                    =
                </button>
                <button
                    id="reset-button"
                    onClick={() => {
                        updateCurrent(undefined);
                        updateChiffre(undefined);
                        updateOp(undefined);
                        setError("");
                    }}
                >
                    Reset
                </button>
            </header>
        </div>
    );
}

export default App;