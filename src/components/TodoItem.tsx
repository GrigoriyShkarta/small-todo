import {FC} from "react";

import {ITodo} from "../types/data";

interface ITodoItem extends ITodo {
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

const TodoItem: FC<ITodoItem> = (props) => {
    const {id, title, complete, toggleTodo, removeTodo} = props

    return (
        <div>
            <input type="checkbox" checked={complete} onChange={() =>toggleTodo(id)} />
            <span style={{display: 'inline-block', margin: '0 10px'}}>{title}</span>
            <button
                onClick={() => removeTodo(id)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'red'
                }}
            >x</button>
        </div>
    );
};

export {TodoItem};