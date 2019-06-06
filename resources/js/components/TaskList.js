import React, { Component } from 'react';
import TaskItem from './TaskItem';
import * as actions from './actions/index';
import { connect } from 'react-redux';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1, // -1 all 1 kich hoat 0 an
        };
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }

    onChangeFilter(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        // this.props.onFilter(
        //     name === 'filterName' ? value : this.state.filterName,
        //     name === 'filterStatus' ? value : this.state.filterStatus,
        // );
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName,
            status : name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
           [name] : value
        });
    }

    render() {
        var {tasks, filterTable, keyword, sort} = this.props;
        if (filterTable.name) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
            });
        }
            tasks = tasks.filter((task) => {
                if (filterTable.status === -1) {
                    return task;
                } else {
                    return task.status === ( filterTable.status === 1 ? true : false );
                }
             });
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword) !== -1;
        });

        if(sort.by === 'name') {
            tasks.sort((a, b) => {
                if(a.name > b.name) return sort.value;
                else  if(a.name < b.name) return -sort.value;
                else return 0;
            });
        } else {
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sort.value;
                else  if(a.status < b.status) return sort.value;
                else return 0;
            });
        }
        var elmTasks = tasks.map((task, index) => {
            return <TaskItem
                key = {index}
                index = {index}
                task = {task}
            />;
        });

        return (
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Hành động</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            name="filterName"
                            value={ this.state.filterName}
                            onChange={ this.onChangeFilter }
                        />
                    </td>
                    <td>
                        <select
                            className="form-control"
                            name="filterStatus"
                            value={ this.state.filterStatus }
                            onChange={ this.onChangeFilter }
                        >
                            <option value={-1}>Tất cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {elmTasks}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks : state.task,
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
