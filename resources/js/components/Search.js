import React, { Component } from 'react';
import * as actions from "./actions";
import {connect} from "react-redux";

class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword : '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] :value
        });
    }

    onSearch(){
        this.props.onSearch(this.state.keyword)
    }

    render() {
        var {keyword} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        name="keyword"
                        type="text"
                        className="form-control"
                        value={keyword}
                        placeholder="Nhập từ khóa..."
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
                       <button
                           type="button"
                           className="btn btn-primary"
                           onClick={this.onSearch}
                       >
                           Tìm
                       </button>
                    </span>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch : (keyword) => {
            dispatch(actions.searchTask(keyword))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
