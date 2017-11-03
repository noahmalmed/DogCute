import React from 'react';
import { CardModel } from '../typeDefinitions';
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';

type Props = {
    cardData: CardModel,
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: height - 75,
    }, 
    imageStyle: {
        alignSelf: 'center',
        position: 'absolute',
        top: 15,
        bottom: 0,
        left: 15,
        right: 15,
        borderRadius: 15,
    }
})

const Card = (props: Props) => {
    const { cardData } = props
    return (
        <View style={styles.containerStyle}>
            <Image
                resizeMode="cover"
                style={styles.imageStyle}
                source={{uri: cardData.imageUrl}}
            />
        </View>
    );
}

export default Card;