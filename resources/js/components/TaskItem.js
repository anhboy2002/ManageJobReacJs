import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class TaskItem extends Component{
    constructor(props) {
        super(props);
        this.onUpdateStatus = this.onUpdateStatus.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditTask = this.onEditTask.bind(this);
    }

    onUpdateStatus(){
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete(){
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();

    }

    onEditTask(){
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
        var {task} = this.props;
        var {index} = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        className={task.status === true ? 'label label-danger' : 'label label-success'}
                        onClick={this.onUpdateStatus}
                    >{task.status === true ? 'Kich Hoat' : 'An'}</span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.onEditTask}
                    >
                        <span className="fa fa-pencil mr-5">Sửa</span>
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <span
                            className="fa fa-trash mr-5"
                        >Xóa</span>
                    </button>
                </td>
            </tr>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        },
        onOpenForm : () => {
            dispatch(actions.openForm())
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);