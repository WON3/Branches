import React, { Component } from 'react';

import './View_Story.css'


class ReadView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currentPage: 2,
      showNextButton: true,
      showPreviousbutton: false,
      backArrow: "<"
    }
    this.changePage = this.changePage.bind(this)
  }

  componentDidMount() {
      this.setState({
        pages: this.props.pages,
        showNextButton: this.props.pages.length > 2 ? true : false
      })
  }

  changePage(buttonOption) {
    const pageTurnCount = 2
    // if current pages === totalPages setState showNextButton false
    if(buttonOption === `next`){
      if (this.state.pages.length >= this.state.currentPage) {
        this.setState({
          currentPage: this.state.currentPage + pageTurnCount,
          showNextButton: this.state.currentPage + pageTurnCount >= this.state.pages.length ? false : true,
          showPreviousbutton: this.state.currentPage + pageTurnCount <= 2 ? false : true,
        })
      }
    } else if(buttonOption === `prev`){
      if (2 < this.state.currentPage) {
        this.setState({
          currentPage: this.state.currentPage - pageTurnCount,
          showPreviousbutton: this.state.currentPage - pageTurnCount <= 2 ? false : true,
          showNextButton: this.state.currentPage - pageTurnCount >= this.state.pages.length ? false : true,

        })
      }
    }
  }



  render() {
    const { pages, currentPage } = this.state;
    return (
      <div className="contribution-view-story">
        <div className="view-story-page one" onClick={()=>{this.changePage('prev')}}>
          <div className="hoverBug-1" >{this.state.backArrow}</div>
          {pages.length > 0 ? pages[currentPage - 2].arrWords.join(' ') : 'No content'}
        </div>
        <div className="view-story-page two" onClick={()=>{this.changePage('next')}}>
          <div className="hoverBug-2" > > </div>
          {pages.length > 0 ? pages.length > 1 ? currentPage < pages.length ?  pages[currentPage - 1].arrWords.join(' ') : '' : '' : 'No Content'}
        </div>

      </div>
    );
  }
}

export default (ReadView);
// style={showPreviousbutton ? { display: "block" } : { display: "none" }}
// style={showNextButton ? { display: "block" } : { display: "none" }}