import React, { useState, useEffect } from 'react';
import Upload from '../../assets/icons/upload.svg';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import { createTask, getTasks } from '../../store/slices/tasksSlice';
import { getOneProject } from '../../store/slices/projectSlice'
import { joiResolver } from '@hookform/resolvers/joi';
import WithTranslation from '../hoc/WithTranslation';


const Form = ({ projects, validationSchema, t}) => {
    const { email } = useSelector(state => state.user.user)
    const { selectedProject } = useSelector(state => state.projects);
    const [selectedProjectId, setSelectedProjectId] = useState(selectedProject ? selectedProject.id : '' );
    const currentTaskQtyInProject = Number(selectedProject.taskQty.integerValue);
  
    const dispatch = useDispatch();
    const { register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isValid,
        }
    } = useForm({
        mode: 'all',
        resolver: joiResolver(validationSchema),
    });
    const reselectProjectHandler = (event) => {
        const reselectedProjectId = event.target.value;
        setSelectedProjectId(reselectedProjectId);
    }
    useEffect(() => {
        dispatch(getOneProject(selectedProjectId));
        return () => {
            dispatch(getOneProject(selectedProjectId));
        };
    }, [dispatch])
    
    const onSubmit = async (data) => {
        const nextTaskNumber = currentTaskQtyInProject + 1;
        try {
        await dispatch(
            createTask({
                title: data.title,
                isCompleted: false,
                status: 'queue',
                description: data.description,
                priority: data.priority,
                projectId: selectedProjectId,
                author: email.stringValue,
                deleted: false,
                number: nextTaskNumber,
                
            })
        );
            await dispatch(getTasks());
            await dispatch(getOneProject(selectedProjectId));
            await dispatch(closePopup({ name: 'addTaskPopup' }));
        reset();
        } catch (error) {
             console.log("Ошибка при создании задачи или обновлении taskQty:", error);
        }
    };

    return (
        <form id="form" action="#" className="form" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="form__title">{t('add-task-form-title')}</h3>
            <fieldset className="form__fieldset">
                <input className="form__input" {...register('title')} placeholder={t('add-task-title-placeholder')} />

                <select
                    className="form__select"
                    {...register('projectId')}
                    onChange={reselectProjectHandler}
                    defaultValue={selectedProjectId}
                >
                    {
                        projects.map((project)=> (
                            <option key={project.id} value={project.id}>{project.title.stringValue}</option>
                        ))
                    }
                </select>
                <select className="form__select" {...register('priority')} >
                    <option value="usual">{t('add-task-priority-select-placeholder')}</option>
                    <option value="usual">usual</option>
                    <option value="seriously">seriously</option>
                    <option value="critical">critical</option>
                </select>
            </fieldset>
            <textarea
                className="form__text-area"
                {...register('description')}
                placeholder={t('add-task-text-placeholder')}
                spellCheck="true"
            ></textarea>
            {/* <div className="form__file-wrapper">
                <label className="form__input-label" htmlFor="file">
                    <span className="form__input-icon-wrapper">
                        <img className="popup__form-load-icon" src={Upload} alt="select files"></img>
                    </span>
                    <span className="form__input-file-text">{t('upload-files-placeholder')}</span>
                </label>
                <input className="form__input-file" id="file" name="file" type="file" multiple />
            </div> */}
            <button type="submit" className="form__button-submit button" disabled={!isValid}>
                {t('add-task-btn')}
            </button>
        </form>
    );
};

export default WithTranslation(Form);
