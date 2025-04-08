import 'reset-css';
import 'swiper/css';
import './scss/index.scss';
import {store} from './store/store';
import {Provider} from 'react-redux';

import {StackNavigator} from './navigation/StackNavigator';

function App() {
  return (
    <div>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </div>
  );
}

export default App;
