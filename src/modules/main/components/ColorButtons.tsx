import { ColorButton } from "./ColorButton";

type ColorButtonsProps = {
    isStarted: boolean;
    isFilled: boolean;
    onColorSelect: (color: string) => void;
};

export const ColorButtons = ({ isStarted, isFilled, onColorSelect }: ColorButtonsProps) => {
    const availableColors = ["red", "yellow", "green", "blue", "purple", "white", "black"];
    const unavailableColors = ["#a65a5a", "#dbe077", "#3f7a3d", "#4a53d9", "#bc65eb", "#c7c7c7", "#474747"];

    return (
        <div className="flex space-x-4 justify-center">
            {isFilled ? (
                unavailableColors.map((color, index) => (
                    <ColorButton key={index} color={color} isStarted={isStarted} isFilled={isFilled} onClick={onColorSelect} />
                ))
            ) : (
                availableColors.map((color, index) => (
                    <ColorButton key={index} color={color} isStarted={isStarted} isFilled={isFilled} onClick={onColorSelect} />
                ))
            )}
        </div>
    );
};
