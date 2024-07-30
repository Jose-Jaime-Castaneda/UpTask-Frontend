import { Project, TaskProject, TaskStatus } from "@/types/index";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { StatusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { updateStatus } from "@/api/TaskAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type TaskListProps = {
    tasks: TaskProject[];
    canEdit: boolean
}

type GroupedTask = {
    [key: string]: TaskProject[]
}

const initialStatusGroups: GroupedTask = {
    pending: [],
    inProgress: [],
    onHold: [],
    underReview: [],
    completed: []
}

const StatusStyles: { [key: string]: string } = {
    pending: 'border-t-slate-500',
    inProgress: 'border-t-red-500',
    onHold: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}

export default function TaskList({ tasks, canEdit }: TaskListProps) {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projectById', projectId] })
            navigate(location.pathname, { replace: true })
            toast.success(data)
        }
    })

    const handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e
        if (over === null) {
            mutate({ projectId, taskId: active.id.toString(), status: "pending" })
        } else if (over && active.id) {
            mutate({ projectId, taskId: active.id.toString(), status: over.id as TaskStatus })
        }

        queryClient.setQueryData(['projectById', projectId], (prevData: Project) => {
            const updatedTask = prevData.tasks.map((task) => {
                if (task._id === active.id) {
                    return {
                        ...task,
                        status: over?.id as TaskStatus
                    }
                }
                return task
            })

            return {
                ...prevData,
                tasks: updatedTask
            }

        })
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                            <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${StatusStyles[status]}`} >{StatusTranslations[status]}</h3>

                            <DropTask status={status} />

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    );
};