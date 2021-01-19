import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useEffect, useState} from "react";
import AddTask from "./components/AddTask";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        return await res.json();
    }

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }

        getTasks();
    }, []);

    // Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Toggle Reminder
    const toggleReminder = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        reminder: !task.reminder,
                    }
                    : task
            )
        );
    };

    // Add Task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1;
        const newTask = {id, ...task};
        setTasks([...tasks, newTask]);
    }

    return (
        <div className="container">
            <Header
                onAdd={() => setShowAddTask(!showAddTask)}
                showAddTask={showAddTask}
            />
            {
                showAddTask && <AddTask onAdd={addTask} />
            }
            {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
            ) : (
                "No tasks to show"
            )}
        </div>
    );
}

export default App;
