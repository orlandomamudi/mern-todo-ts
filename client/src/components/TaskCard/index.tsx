import React from "react";
import classnames from 'classnames';
import { useMutation, useQueryClient } from "react-query";

import DeleteModal from "../DeleteModal";

import CheckListIcon from '../../assets/svg/checklist';
import TrashIcon from '../../assets/svg/trash';
import ClockIcon from '../../assets/svg/clock';
import { updateTodo } from "../../api/updateTodo";

type Props = {
    taskId: string,
    title: string,
    status: 'completed' | 'uncompleted'
}

const TaskCard: React.FC<Props> = ({ title , taskId, status }) => {
    const cache = useQueryClient()

    const [checkTodo, { isLoading }] = useMutation(updateTodo, {
        onSuccess: () => {
            cache.invalidateQueries('todos')
        }
    }) 

    const containerClass = classnames('flex justify-center items-center relative rounded shadow-lg p-4 mb-2', {
        'bg-white text-darkPurple': status === 'uncompleted',
        'bg-gray-300 bg-opacity-50': status === 'completed'
    })

    const titleClass = classnames('flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate', {
        'line-through': status === 'completed'
    })

    const checkListClass = classnames('w-5 h-5 ml-4', {
        'text-red-400': status === 'completed',
        'text-red-600': status === 'uncompleted'
    })

    return (
        <div className={containerClass}>
            <p className={titleClass}>
                {title}
            </p>

            <div className="flex text-darkPurple">
                <span>
                    {isLoading ?  (
                        <ClockIcon />
                    ): (
                        <CheckListIcon className={checkListClass} onClick={() => checkTodo(taskId)} />
                    )}
                </span>
                <span className="w-5 h-5 ml-4 text-red-600"><TrashIcon /></span>
            </div>

            {/* <DeleteModal /> */}
        </div>
    )
}

export default TaskCard