import React, {useEffect} from 'react'
import Popup from '../Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userProfileSchema } from '../../utils/validation';
import { joiResolver } from '@hookform/resolvers/joi';
import WithTranslation from '../hoc/WithTranslation';
import { setUserName, updateUser } from '../../store/slices/userSlice';
import Upload from '../../assets/icons/upload.svg';
import { closePopup } from '../../store/slices/popupSlice';

const EditProfilePopup = ({ t }) => {
    const { editProfilePopup: { isOpen } = false } = useSelector(state => state.popup.openedPopups);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    


    const { register,
        handleSubmit,
        reset,
        setValue,
        formState: {
            errors,
            isValid,
        }
    } = useForm({
        mode: 'all',
        resolver: joiResolver(userProfileSchema),
    });

    useEffect(() => {
        if (isOpen && user && user.name && user.name.stringValue) {
            setValue('name', user.name.stringValue);
        } else {
            reset();
        }
        
    }, [isOpen, user]);


    const onSubmit = (formData) => {
     
        dispatch(updateUser({ userId: user.id, newData: formData }));
        dispatch(closePopup({ name: 'editProfilePopup' }))
    };



  return (
      <Popup className="popup_type_edit-profile" isOpen={isOpen} popupName={'editProfilePopup'} >
          <form className='edit-profile-form' onSubmit={handleSubmit(onSubmit)}>
              <fieldset className='edit-profile-form__fieldset'>
                  <label className='edit-profile-form__input-label form__input-label'>
                      {t('name')}: <input 
                          {...register('name')}
                        className='edit-profile-form__input form__input' 
                        type="text" 
                    
                      
                        
                        />
                    </label>
     
            </fieldset>
              <button className='edit-profile-form__button-submit' type='submit'>{t('save')}</button>
        </form>
      </Popup>
  )
}

export default WithTranslation(EditProfilePopup)