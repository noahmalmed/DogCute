// @flow

import React, {Component} from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SwipeCards from 'react-native-swipe-cards';

import type { CardModel } from '../typeDefinitions';
import Card from './Card';
import {
    backgroundBlue,
    cuteGreen,
    notCuteRed,
} from '../styles/colors'
import type { AppState } from '../reducers';
import * as swiperActions from '../actions.js';

const MAX_PRELOADED_CARD = 4;

const mapStateToProps = (state: AppState) => {
    const cardData = state.swiper.cardUrls.map((url, index) => (
        {key: index, imageUrl: url}
    )).slice(state.swiper.cardsRemoved);
    return {
        isFetchingData: state.network.isFetchingData,
        cardData,
    };
}

const mapDispatchToProps = dispatch => ({
    swiperActions: bindActionCreators(swiperActions, dispatch),
  });

type Props = {
    swiperActions: typeof swiperActions,
    cardData: Array<CardModel>
}

type State = {
    isCardSuccess: boolean,
    feedbackViewOpacity: Animated.Value
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: backgroundBlue
    },
    feedbackViewContainerStyle: {
        position: 'absolute',
        bottom: 0, 
        left: 0, 
        right: 0, 
        top: 0
    },
    feedbackViewStyle: { 
        flex: 1,
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 50,
        marginVertical: 15,
        textAlign: 'center',
    }
});

class MainScreen extends Component<Props, State> {
    cardSwiper: SwipeCards;

    constructor(props: Props) {
        super(props);
        this.state = {
            isCardSuccess: false,
            feedbackViewOpacity: new Animated.Value(0),
        }
    }

    static navigationOptions = ({ navigation }) => {
        const RightButton =  () => (
            <Button 
                title="favorites"
                onPress={() => {
                    navigation.navigate('Favorites')
                }}
            />
        );
        return ({
            headerTitle: 'Are These Dogs Cute?',
            headerRight: <RightButton />,
        });
      };

    componentDidMount() {
        // Preload some images
        for(let i = 0; i < MAX_PRELOADED_CARD; i++) {
            this.props.swiperActions.requestRandomDogData();
        }
    }

    cardRemoved() {
        this.props.swiperActions.requestRandomDogData()
    }

    cardWasSwipedRight(card: CardModel) {
        this.props.swiperActions.cardSwiped(true, card.imageUrl)
        this.setState({
            isCardSuccess: true,
        }, this.animateTextPop());
        
    }

    cardWasSwipedLeft(card: CardModel) {
        this.props.swiperActions.cardSwiped(false, card.imageUrl)
        this.setState({
            isCardSuccess: false,
        }, this.animateTextPop());
    }
    
    render() {
        const text = this.state.isCardSuccess ? 'Cute!' : 'Not Cute';
        const backgroundColor = this.state.isCardSuccess ?  cuteGreen : notCuteRed;
        const animatedStyle = {opacity: this.state.feedbackViewOpacity, backgroundColor};
        return (
        <View style={styles.containerStyle}>
            <SwipeCards
                cards={this.props.cardData}
                renderCard={(cardUrl: string) => <Card cardData={cardUrl} />}
                stack
                backgroundColor="white"
                stackOffsetX={0}
                renderNoMoreCards={() => <Text> Loading More Cards </Text>}
                handleYup={this.cardWasSwipedRight.bind(this)}
                handleNope={this.cardWasSwipedLeft.bind(this)}
                showYup={false}
                showNope={false}
                cardRemoved={this.cardRemoved.bind(this)}
                ref={(ref) => this.cardSwiper = ref}
                onClickHandler={() => {}}
            />
            <View style={styles.feedbackViewContainerStyle} pointerEvents="none">
                <Animated.View style={[styles.feedbackViewStyle, animatedStyle]}>
                    <Text style={styles.textStyle}> 
                        {text} 
                    </Text>
                </Animated.View>
            </View>
        </View>
        );
    }

    animateTextPop() {
        Animated.sequence([
            Animated.timing(
                this.state.feedbackViewOpacity,
                {
                  toValue: 0.5,
                  duration: 200,
                }                              
            ),
            Animated.timing(
                this.state.feedbackViewOpacity,
                {
                  toValue: 0,
                  duration: 300,
                }                              
            ),
        ]).start();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);