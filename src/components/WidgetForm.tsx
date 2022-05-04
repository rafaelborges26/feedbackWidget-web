import { CloseButton } from "./CloseButton"
import BugImageUrl from '../assets/bug.svg'
import IdeaImageUrl from '../assets/idea.svg'
import ThoughtImageUrl from '../assets/thought.svg'
import { useState } from "react"


const feedbackTypes = {
    BUG: {
        title: 'Problem',
        image: {
            source: BugImageUrl,
            alt: 'imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Idea',
        image: {
            source: IdeaImageUrl,
            alt: 'imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Other',
        image: {
            source: ThoughtImageUrl,
            alt: 'imagem de um balão de pensamento'
        }
    },
}

type feedbackTypes = keyof typeof feedbackTypes

export const WidgetForm = () => {

    const [feedbackType, setFeedbackType] = useState<feedbackTypes | null>(null)

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto" >
            
            <header>
                <span className="text-xl leading-6" >Deixe seu feedback</span>
                <CloseButton />
            </header>

            <div className="flex py-8 gap-2 w-full">
            { Object.entries(feedbackTypes).map(([key, value]) => {
                return (
                    <button onClick={() => {setFeedbackType(key as feedbackTypes)}} key={key} className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none" >
                        <img src={value.image.source} alt={value.image.alt} />
                        <span>{value.title}</span>
                    </button>
                )
            })}
            </div>

            <footer className="text-xs text-neutral-400"  >
            Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com">Rocketseat</a>

            </footer>

        </div>
    )
}