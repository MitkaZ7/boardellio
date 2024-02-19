import React from 'react'
import { useTranslation } from 'react-i18next'
const avatar = require('../../assets/images/avatar.png');
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { user } = useSelector((state)=> state.user);
    console.log(user)
  return (
    <div className='user-profile'>
      <div className="user-profile__header">
        <img src={avatar} alt="user avatar" className="user-profile__avatar" />
      </div>
      <div className="user-profile__info">
        <div className="user-profile__info-item">
          email: 
          <span> {user.email}</span> 
        </div>
        <div className="user-profile__info-item">
          name:
          <span> Jhon Travolta</span>
        </div>
        <div className="user-profile__info-item">
          role:
          <span> user</span>
        </div>
      </div>
      <div className="user-profile__projects">
        <div className="">
          <h3 ser-profile__projects-header>
            My projects:
          </h3>
        </div>
        <div className="">
          <h3 ser-profile__projects-header>
            My tasks:
          </h3>
        </div>
      </div>

    </div>
  )
}

export default UserProfile