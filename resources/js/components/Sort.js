import React, { Component } from 'react';
import * as actions from "./actions";
import {connect} from "react-redux";

class Sort extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sort : {
                by : 'name',
                value : 1,
            },
        };
        this.onClick = this.onClick.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    onClick(sortBy, sortValue){
       var sort = {
           by : sortBy,
           value : sortValue,
       };
       this.props.onSort(sort);
       this.setState({
           sort : {
               by : 'name',
               value : 1,
           }
       });
    }

    render() {
        var {sort} = this.props;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        Sắp Xếp
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)} >
                            <a
                                role="button"
                                className={(this.props.sortBy === 'name' && this.props.sortValue === 1 ? 'active' : '')}>
                                <span>Từ A-Z</span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a
                                role="button"
                                className={(this.props.sortBy === 'name' && this.props.sortValue === -1 ? 'active' : '')}>
                                <span>Từ Z-A</span>
                            </a>
                        </li>
                        <li role="separator" className="divider">   </li>
                        <li onClick={() => this.onClick('status', 1)}>
                            <a
                                role="button"
                                className={(this.props.sortBy === 'status' && this.props.sortValue === 1 ? 'active' : '')}>
                                Trạng thái Kích Hoạt
                            </a>
                        </li>
                        <li  onClick={() => this.onClick('status', -1)}>
                            <a
                                role="button"
                                className={(this.props.sortBy === 'status' && this.props.sortValue === -1 ? 'active' : '')}>
                                Trạng thái Ẩn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sort : state.sort
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort : (sort) => {
            dispatch(actions.sortTask(sort))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
