// @flow

import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import type { AppState } from '../reducers';

import {backgroundBlue} from '../styles/colors'

const mapStateToProps = (state: AppState) => ({
    imageUrlData: state.favorites.favoritesUrls.map((url, index) => ({url, key: index})),
});

type ImageListData = {
    url: string,
    key: number,
}

type Props = {
    imageUrlData: Array<ImageListData>
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    containerViewStyle: {
        flex:1,
        backgroundColor: backgroundBlue
    },
    imageListViewStyle: {
        height: width/2, 
        width: width/2, 
        borderWidth: 1
    }
});

class FavoritesScreen extends Component<Props, null> {

    render() {
        return (
            <View style={styles.containerViewStyle}>
                <FlatList
                    style={{ flex:1 }} 
                    horizontal={false}
                    data={this.props.imageUrlData}
                    renderItem={({item }) => <ImageListView url={item.url}/>}
                    numColumns={2}
                />
            </View>
        )
    }

}

type ImageViewProps = {
    url: string,
}

const ImageListView = (props: ImageViewProps) => (
    <View style={styles.imageListViewStyle}>
        <Image
            resizeMode="cover"
            source={{uri: props.url}}
            style={{flex: 1}}
        />
    </View>
)

export default connect(mapStateToProps)(FavoritesScreen);