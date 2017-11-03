// @flow

import React, {Component} from 'react';
import {
  View,
  Animated,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SwipeCards from 'react-native-swipe-cards';

import type { CardModel } from '../typeDefinitions';
import Card from './Card';
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

const renderCard = (cardUrl: string) => <Card cardData={cardUrl} />;

class MainScreen extends Component<Props, State> {
    cardSwiper: SwipeCards;
    animatedTextView: AnimatedTextView;

    constructor(props: Props) {
        super(props);
        this.state = {
            isCardSuccess: false,
            feedbackViewOpacity: new Animated.Value(0),
        }
    }

    componentDidMount() {
        // Preload some images
        for(let i = 0; i < MAX_PRELOADED_CARD; i++) {
            this.props.swiperActions.requestRandomDogData();
        }
    }

    cardRemoved() {
        this.props.swiperActions.cardSwiped()
        this.props.swiperActions.requestRandomDogData()
    }

    cardWasSwipedRight() {
        this.setState({
            isCardSuccess: true,
        }, this.animateTextPop());
        
    }

    cardWasSwipedLeft() {
        this.setState({
            isCardSuccess: false,
        }, this.animateTextPop());
    }
    
    render() {
        const backgroundColor = this.state.isCardSuccess ? '#3ee07f' : '#e26376'
        const text = this.state.isCardSuccess ? 'Cute!' : 'Not Cute'
        return (
        <View style={{flex: 1, backgroundColor: '#99dbff'}}>
            <View style={{flex: 1}}>
                <SwipeCards
                    style = {{flex: 1, alignSelf: 'center'}}
                    cards={this.props.cardData}
                    renderCard={renderCard}
                    stack
                    backgroundColor="white"
                    stackOffsetX={0}
                    handleYup={this.cardWasSwipedRight.bind(this)}
                    handleNope={this.cardWasSwipedLeft.bind(this)}
                    showYup={false}
                    showNope={false}
                    cardRemoved={this.cardRemoved.bind(this)}
                    ref={(ref) => this.cardSwiper = ref}
                >
                </SwipeCards>
            </View>
            <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }} pointerEvents="none">
                <Animated.View style={{ flex: 1, backgroundColor, opacity: this.state.feedbackViewOpacity, justifyContent: 'center'}}>
                    <Text
                        style={{fontSize: 50, marginVertical: 15, textAlign: 'center'}}
                    > {text} </Text>
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