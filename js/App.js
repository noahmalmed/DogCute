// @flow
import { StackNavigator } from 'react-navigation';
import SwiperScreen from './components/SwiperScreen';
import FavoritesScreen from './components/FavoritesScreen';

const App = StackNavigator({
    Main: {
        screen: SwiperScreen,
    },
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            headerTitle: 'Favorites',
        },
    }
})

export default App;