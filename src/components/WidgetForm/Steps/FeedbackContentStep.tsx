import { ArrowLeft } from "phosphor-react"
import { useState, FormEvent } from "react"
import { feedbacksTypes, feedbackTypes } from ".."
import { api } from "../../../services/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading"
import { ScreenshotButton } from "../ScreenshotButton"


interface FeedbackContentStepProps {
    feedbackType: feedbackTypes
    onFeedbackRestartRequested: () => void
    onFeedbackSent: () => void
}

export const FeedbackContentStep = ({ feedbackType, onFeedbackRestartRequested, onFeedbackSent } :  FeedbackContentStepProps) => {

    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    
    const feedbackInfo = feedbacksTypes[feedbackType]

    const handleSubmitFeedback = async (event: FormEvent) => {
        event.preventDefault()
        //console.log({
        //    screenshot,
        //    comment
        //})
        setIsSendingFeedback(true)
        await api.post('feedbacks', {
            type: feedbackType,
            screenshot,
            comment
        })

        setIsSendingFeedback(false)
        onFeedbackSent()
    }

    return (
        <>          
        <header>
            <button 
                onClick={onFeedbackRestartRequested} 
                type="button" 
                className="left-5 top-5 absolute text-zinc-400 hover:text-zinc-100"
            >
                <ArrowLeft weight="bold" className="w-4 h-4" />
            </button>
        <span className="text-xl leading-6 flex flex-col items-center gap-2" >
            <img src={feedbackInfo.image.source} alt={feedbackInfo.image.alt} className="w-6 h-6" />
            {feedbackInfo.title}
        </span >
        <CloseButton />
    </header>

        <form onSubmit={handleSubmitFeedback} className="my-4 w-full ">
            <textarea
            className="min-w-[304px] w-full min-h-[112px] text-sm placeholder:zic-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin "
            placeholder="Conte com detalhes o que está acontecendo..."
            onChange={event => setComment(event.target.value)}
            />
            <footer className="flex gap-2 mt-2" >
                <ScreenshotButton screenshot={screenshot} onScreenshotTook={setScreenshot}/>
                <button 
                    disabled={comment.length === 0 || isSendingFeedback}
                    type="submit"
                    className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 "
                >
                    { isSendingFeedback ? <Loading /> : 'Enviar feedback' }
                </button>

            </footer>
        </form>

        
            </>
    )
}