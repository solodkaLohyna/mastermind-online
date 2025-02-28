import { Peg } from "./Peg"

type PegsProps = {
    content: string;
    number: number;
}

export const PegsContainer = ({ content, number }: PegsProps) => {
    return (
        <div className="flex space-x-4">
            {Array.from({length: number}, (_, index) => (
                <Peg size="w-12 h-12"content={content} key={index}/>
            ))}
        </div>
        
    )
}