import React, { Component } from 'react';
import TaskForm from './TaskForm';
import Control from './Control';
import TaskList from './TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskEditing : null,
            filter : {
                name : '',
                status :-1,
            },
            keyword : '',
            sortBy :'name',
            sortValue : 1,
        };
        this.onToggleForm = this.onToggleForm.bind(this);
    }

    onToggleForm(){
       var {itemEditing} = this.props;
       if (itemEditing && itemEditing.id != '') {
           this.props.onOpenForm()
       } else {
           this.props.onToggleForm();
       }
        this.props.onClearTask({
            id : '',
            name : '',
            status : false,
        });
    }

    render() {
        var {isDisplayForm} = this.props;

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lí công việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        {/*Form*/}
                        <TaskForm/>
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={ this.onToggleForm }
                        >
                            Thêm công việc
                        </button>
                        {/*Search-Sort*/}
                        <Control />
                        {/*List*/}
                        <div className="row mt-5">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm())
        },
        onClearTask : (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm : () => {
            dispatch(actions.openForm())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
