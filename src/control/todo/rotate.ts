import { StateMapObject } from './../../reducers/index';

import store from '../../store';
import actions from '../../actions';
import { GlobalState } from '../../reducers';
import MatrixManager from '../matrixManager';
import TetrisBlock from '../tetrisBlock';
import musicManager from '../../until/music';
let rotate = ()=> {
    let state = store.getState() as any as GlobalState
    let matrix = state.get('matrix') as StateMapObject['matrix']
    let cur = state.get('cur') as StateMapObject['cur']    
    let next = (new TetrisBlock(cur)).rotate()
    if (MatrixManager.want(matrix, next)) {
        store.dispatch(actions.moveBlock(new TetrisBlock(next)))        
    }    
    musicManager.rotate()
}

export default rotate;