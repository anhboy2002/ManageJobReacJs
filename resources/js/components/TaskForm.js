import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class TaskForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false,
        };
        this.onCloseForm = this.onCloseForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    componentWillMount() {
         if ( this.props.itemEditing){
             this.setState({
                 id : this.props.itemEditing.id,
                 name : this.props.itemEditing.name,
                 status : this.props.itemEditing.status,
             })
         } else {
             this.onClear();
         }
     }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing){
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status,
            })
        } else if (!nextProps.itemEditing){
            this.setState({
                id : '',
                name : '',
                status : true,
            })
        }
     }

    onCloseForm(){
        this.props.onCloseForm();
    }

    onChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === "status"){
            value = target.value === 'false' ? false : true;
        }
        this.setState({
            [name] :value
        });
    }

    onSave(event){
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear(){
       this.setState({
           name : '',
           status : true,
       });
       this.onCloseForm();
    }

    render() {
        var {id} = this.state;
        if (!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <span
                            className="text-right"
                            onClick={ this.onCloseForm }
                        >XXXX
                        </span>
                        { id !== '' ? 'Cap nhap cong viec' : 'Thêm công việc'}
                    </h3>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng thái :</label>
                        <select
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning"  onClick={this.onSave}>
                                Lưu lại
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >
                                Hủy bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
