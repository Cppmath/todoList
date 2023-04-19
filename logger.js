export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(action)
        console.log('PrevState: ', prevState)
        console.log('Action agrument: ', args)
        const nextState = reducer(prevState, action, args)
        console.log('nextState: ', nextState)
        console.groupEnd()
        return nextState
    }       
}