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
      dateCompleted: '', // Fixed typo from datecompleted to dateCompleted
      friends_id: []
    })
  });
  
export default GoalWithId;