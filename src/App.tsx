import "canvas-core-react/lib/CanvasStyles.css";
import { ErrorHumanization } from "./components/ErrorHumanization";

function App() {
    const onPrimaryAction = () => {
        console.log("onPrimaryAction");
    };
    return (
        <ErrorHumanization errorCode="TEST" onPrimaryAction={onPrimaryAction} />
    );
}

export default App;
