import { feedbackTypes, feedbacksTypes } from '..'
import { CloseButton } from '../../CloseButton'

interface feedbackTypeProps {
    onFeedbackTypeChanged: (type: feedbackTypes) => void    
}

export const FeedbackTypeStep = ({ onFeedbackTypeChanged }: feedbackTypeProps) => {



    return (
        <>          
        <header>
        <span className="text-xl leading-6" >Deixe seu feedback</span>
        <CloseButton />
    </header>

        <div className="flex py-8 gap-2 w-full">
            { Object.entries(feedbacksTypes).map(([key, value]) => {
                return (
                    <button onClick={() => {onFeedbackTypeChanged(key as feedbackTypes)}} key={key} className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none" >
                        <img src={value.image.source} alt={value.image.alt} />
                        <span>{value.title}</span>
                    </button>
                )
            })}
            </div>
            </>
    )
}