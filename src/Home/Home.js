import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const pageSize = 5;

class Home extends Component {

    state = {
        page_id: 1,
        data: [],
        dataFromApi: [],
        disableArrowLeft: true,
        disableArrowRight: false,
        showEmptyListInfo: false
    }

    changePage = ( page_num = 1) => {
        let lState = page_num == 1 ? true : false;
        this.setState({ disableArrowLeft: lState });
        
        let search_value = document.querySelector('#search').value;
        this.setState({ page_id: page_num });
        let temp_tab = [];
        temp_tab = [...this.state.dataFromApi];

        if(search_value!=''){
            temp_tab =  temp_tab.filter( (element,index)=>{
               return element.title.includes(search_value) ;
            });
        }
        
        let rState = (temp_tab.length < (page_num*pageSize)+1) ? true : false;
        this.setState({ disableArrowRight: rState });

        temp_tab = temp_tab.slice((page_num*pageSize)-pageSize,page_num*pageSize);
        this.setState({ data: temp_tab });

        let showEmptyInfo = temp_tab.length==0;
        this.setState({ showEmptyListInfo: showEmptyInfo });
    };

    handlePrevPage = () => {
        if(this.state.page_id>1){
            let new_num = this.state.page_id-1;
            this.setState({ page_id: new_num })
            this.changePage(new_num);
        }
    }

    handleNextPage = () => {
        let new_num = this.state.page_id+1;
        this.setState({ page_id: new_num })
        this.changePage(new_num);
    }

    searchType = () => {
        this.changePage(1);
        this.setState({ page_id: 1 });
    };

    componentDidMount() {
        let page_num = parseInt(this.props.match.params.page);
        fetch(`https://jsonplaceholder.typicode.com/posts?_start=1&_limit=100`)
        .then(response => response.json())
        .then(result =>  {
            this.setState({ dataFromApi: result })
            this.changePage(page_num);
        });
        !isNaN(page_num) ? this.setState({ page_id: page_num }) : page_num = 1;
    
      }

      
    render() {
       
        return (
            <div>
                <h1 className="title">
                    Wspaniała wyszukiwarka
                </h1>
                <div className="searchBox">
                    <input type="text" id="search" name="search" onKeyUp={this.searchType} placeholder="Wpisz szukaną frazę"/>
                </div>
                <p id="emptyList" className={this.state.showEmptyListInfo?'show': ''}>Brak wyników</p>
                <ul className="listOfItems">
                    {this.state.data.map(item =>
                        <li key={`t-${item.id}`}>
                            {item.title}
                        </li>
                    )}
                </ul>
                <ul className="pagination">
                    <li><a id="go_prev" onClick={this.handlePrevPage} className={this.state.disableArrowLeft?'disabled': ''}><FontAwesomeIcon icon={faArrowLeft} /></a></li>
                    <li><span>{this.state.page_id}</span></li>
                    <li><a  id="go_next" onClick={this.handleNextPage} className={this.state.disableArrowRight?'disabled': ''}><FontAwesomeIcon icon={faArrowRight} /></a></li>
                </ul>
            </div>
        );
      }
}

export default Home;