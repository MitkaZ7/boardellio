import React, { useState, useEffect } from 'react';
import Upload from '../../assets/icons/upload.svg';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import { createTask } from '../../store/slices/tasksSlice';


const Form = ({ projects }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        dispatch(
            createTask({
                title: data.title,
                isCompleted: false,
                description: data.description,
                priority: data.priority,
                project: data.project,
            })
        );

        dispatch(closePopup());
        reset();
    };

    return (
        <form id="form" action="#" className="form" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="form__title">Add new task</h3>
            <fieldset className="form__fieldset">
                <input className="form__input" {...register('title')} />

                <select className="form__select" {...register('project')}>
                    <option value="noNameProject">Select a project</option>
                    {Array.isArray(projects) &&
                        projects.map((project) => (
                            <option key={project.objectId} value={project.name}>
                                {project.name}
                            </option>
                        ))}
                </select>
                <select className="form__select" {...register('priority')}>
                    <option value="usual">Assign priority</option>
                    <option value="usual">usual</option>
                    <option value="seriously">seriously</option>
                    <option value="critical">critical</option>
                </select>
            </fieldset>
            <textarea
                className="form__text-area"
                {...register('description')}
                placeholder="Add task text"
                spellCheck="true"
            ></textarea>
            <div className="form__file-wrapper">
                <label className="form__input-label" htmlFor="file">
                    <span className="form__input-icon-wrapper">
                        <img className="popup__form-load-icon" src={Upload} alt="select files"></img>
                    </span>
                    <span className="form__input-file-text">Upload files...</span>
                </label>
                <input className="form__input-file" id="file" name="file" type="file" multiple />
            </div>
            <button type="submit" className="form__button-submit button">
                Add
            </button>
        </form>
    );
};

export default Form;
