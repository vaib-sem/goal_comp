import {
    RecoilRoot,
    atom,
    atomFamily,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';


const GoalWithId = atomFamily({
    key: 'GoalWithId', 
    default:(id) => ({
      goalName: '',
      goalDescription: '',
      goalStart: new Date(),
      goalEnd: new Date(),
      datecompleted: '', 
      friends_id: []
    })
  });
export default GoalWithId;