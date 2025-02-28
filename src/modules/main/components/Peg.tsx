//Icons
import { CircleHelp } from "lucide-react"

//Types
type Peg = {
    content: string;
    size:string;
}

export const Peg = ({ content, size }: Peg) => {
    return (
        <div>
            {content != "icon" ?
                (<div className={"rounded-[50%] w-12 h-12 shadow-md border-[#616161] border-2 transition-colors duration-800" + " " + size}
                    style={{ backgroundColor: content, }}></div>)
                : (
                    <CircleHelp size={52} strokeWidth={1.3} />
                )}
        </div>
    )
}