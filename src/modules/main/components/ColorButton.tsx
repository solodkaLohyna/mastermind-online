type Button = {
    color: string;
    isStarted: boolean;
    isFilled: boolean;
    onClick: (color: string) => void; 
};

export const ColorButton = ({ color, isStarted, isFilled, onClick }: Button) => {
    return (
        <div>
            <button
                className={`rounded-[50%] w-12 h-12 shadow-md border-2 border-[#616161] transition-colors duration-700 ease-in-out ${
                    isStarted ? '' : 'bg-[#a5a5a5]'
                }`}
                style={isStarted ? { backgroundColor: color } : {}}
                disabled={!isStarted || isFilled}
                onClick={() => onClick(color)}
            />
        </div>
    );
};
