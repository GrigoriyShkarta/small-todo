import {ChangeEventHandler, KeyboardEventHandler, FC} from "react";
import {useState, useEffect, useRef} from "react";

import {ITodo} from "../types/data";

import {TodoList} from "./TodoList";

export const App: FC = () => {
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState<ITodo[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') addTodo();
    };

    const addTodo = () => {
        if (value) {
            setTodos([...todos, {
                id: Date.now(),
                title: value,
                complete: false,
            }])
            setValue('')
        }
    }

    const removeTodo = (id: number): void => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleTodo = (id: number): void => {
        setTodos(todos.map(todo => {
            if(todo.id !== id) return todo;

            return  {
                ...todo,
                complete: !todo.complete
            }
        }))
    }

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return (
        <div>
            <div>
                <input value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}/>
                <button onClick={addTodo}>add</button>
            </div>
            <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
        </div>
    );
};
