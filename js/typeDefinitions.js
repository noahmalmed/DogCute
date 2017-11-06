// @flow

export type RandomDogResponse = {
    status: string,
    message: string,
}

export type CardModel = {
    key: number,
    imageUrl: string,
}

export type AddCardAction = {
    type: string,
    dogResponse: RandomDogResponse,
}

export type PlainAction = {
    type: string,
}

export type SwipeAction = {
    type: String,
    wasLiked: boolean,
    url: string, 
}

export type Action = 
    | AddCardAction
    | PlainAction
    | SwipeAction;