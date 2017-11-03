import React from 'react';
import { CardModel } from '../typeDefinitions';
import {
  Image,
  View,
  Dimensions,
} from 'react-native';

type Props = {
    cardData: CardModel,
}

const Card = (props: Props) => {
    const { cardData } = props;
    const {height, width} = Dimensions.get('window');
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            width,
            height: height - 75,
            }}>
            <Image
                resizeMode="cover"
                style={{ alignSelf: 'center', position: 'absolute', top: 15, bottom: 0, left: 15, right: 15}}
                source={{uri: cardData.imageUrl}}
            />
        </View>
    );
}

export default Card;