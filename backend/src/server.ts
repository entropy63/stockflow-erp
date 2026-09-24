import {createApp} from './app';
import { env } from './env';
    
const app = createApp();
app.listen(env.PORT, () =>  {
    console.log('StocFlow API running on port ' + env.PORT);
});
