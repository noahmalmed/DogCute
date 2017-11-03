// @flow
import { StackNavigator } from 'react-navigation';
import SwiperScreen from './components/SwiperScreen';

const App = StackNavigator({
    Main: {
        screen: SwiperScreen,
        navigationOptions: {
            headerTitle: 'Dog Tinder',
          },
      
    }
})

export default App;