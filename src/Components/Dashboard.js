import React from "react";
import EditCity from "./EditCity";
import LowerPart from "./LowerPart";
import NewsSection from "./NewsSection";
import Card from "./UI/Card";
import UpperPart from "./UpperPart";
import Modal from './UI/Modal'
import {useDispatch, useSelector} from 'react-redux';
 

const Dashboard = () => {

  const isEditing = useSelector(state => state.editingCity);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch({type: 'EDIT', val: false})
  }

  return (
    <div className={ `container-fluid main`}>
      {isEditing && <Modal onClose={closeHandler}><EditCity /></Modal>}
      <UpperPart />
      <LowerPart />
      <div className={`row lower-part news-card mb-2`}>
        <div className={`col p-0`}>
          <Card>
            <NewsSection />
          </Card>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;