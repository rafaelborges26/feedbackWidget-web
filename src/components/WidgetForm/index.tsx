import BugImageUrl from '../../assets/bug.svg'
import IdeaImageUrl from '../../assets/idea.svg'
import ThoughtImageUrl from '../../assets/thought.svg'
import { useState } from "react"
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep"
import { FeedbackContentStep } from "./Steps/FeedbackContentStep"
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep"


export const feedbacksTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: BugImageUrl,
            alt: 'imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: IdeaImageUrl,
            alt: 'imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: ThoughtImageUrl,
            alt: 'imagem de um balão de pensamento'
        }
    },
}

export type feedbackTypes = keyof typeof feedbacksTypes

export const WidgetForm = () => {

    const [feedbackType, setFeedbackType] = useState<feedbackTypes | null>(null)
    const [feedbackSend, setFeedbackSend] = useState(false);

    const handleRestartFeedback = () => {
        setFeedbackType(null)   
        setFeedbackSend(false)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto" >
            { feedbackSend ? (<FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />) : 
                <>
                {!feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />

            ) : <FeedbackContentStep onFeedbackSent={() => setFeedbackSend(true)} feedbackType={feedbackType} onFeedbackRestartRequested={handleRestartFeedback} /> }
                </>
            }
            
            <footer className="text-xs text-neutral-400"  >
            Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com">Rocketseat</a>

            </footer>

        </div>
    )
}