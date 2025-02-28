import { PegsContainer } from "./PegsContainer"

type Row = {
    number: number;
    color: string;
}

export const Row = ({ number, color }: Row) => {
    return (
        <div className="flex justify-center">
            <PegsContainer content={color} number={number} />
        </div>
    )
}