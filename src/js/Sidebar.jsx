import React, { Component } from 'react';

class Sidebar extends Component {

    constructor(props) {
        super(props);
    }

    selectCourse = (course) => {
        let newVal = course;
        if(course == this.props.selectedCourse) {
            newVal = null;
        }
        this.props.selectCourse(newVal);
    }

    loadCourses() {
        if(this.props.courses.length) {
            return this.props.courses.map((c, i) => {
                let className = "";
                if(c.id == this.props.selectedCourse) {
                    className="selected";
                }
                return <Course isSelected={className} key={i} {...c} selectCourse={this.selectCourse}/>;
            });
        } else {
            return this.props.isLoading ? null : <li className="warning">You belong to no courses. Please add a course from your profile.</li>
        }
    }

    render() {
        return (
            <div className="sidebar">
                <h2>Courses</h2>
                <div>
                <ul>
                    {this.loadCourses()}
                </ul>
                </div>
            </div>
        );
    }
}

class Course extends Component {

    selectCourse = () => {
        // pass name for now, pass id later
        this.props.selectCourse(this.props.id);
    }

    render() {
        return <li onClick={this.selectCourse} className={this.props.isSelected}>{`${this.props.name} ${this.props.number}`}</li>;
    }
}

export default Sidebar;