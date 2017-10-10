import React, { Component } from 'react';
import $ from 'jquery'
import { ApiUrl } from '.././Config';
import { Link } from 'react-router-dom';
import { MyAjax } from '.././MyAjax.js'
import Notifications, {notify} from 'react-notify-toast';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

class DeleteEmploy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Employ_Id: 0,
        }
    }

    componentWillMount() {
        this.setState({ Employ_Id: this.props.match.params["id"] });

        $.ajax({
            url: ApiUrl + "/api/Edit/DeleteEmp?empId=" + this.props.match.params["id"],
            type: "Post",
            contentType: false,
            processData: false
            
        });
    }

    // notify() {
    //   toast.error("Error Notification !", {
    //   position: toast.POSITION.TOP_CENTER
    // });
    // }

    render() {
        return (
            <div>
                <div className="alert alert-success">
                 <h3> Deleted Successfully click on Add Employee to add again</h3>
             </div>
                <div className="col-xs-12">
                    <Link to="/Registration"> <h3> Add Employee </h3> </Link><br />
                </div>
                <div className="col-xs-12">
                    <Link to="/ViewEmployees"> <h3> View Employees</h3> </Link>
                </div>
                {/* <button onClick={this.notify}> Notify </button> */}
            </div>
        );
    }
}

export default DeleteEmploy





